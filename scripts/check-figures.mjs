#!/usr/bin/env node
/**
 * Checks that every character in an ASCII figure occupies exactly one
 * cell in the font that actually renders it.
 *
 *     npm run build
 *     node scripts/check-figures.mjs
 *     BASE=http://127.0.0.1:4321 node scripts/check-figures.mjs   # use a running server
 *
 * The figures are the one drawn thing on this site, and they only work if
 * a column is a column. That is not guaranteed by using a monospace face:
 * Iosevka draws the arrow and geometric-shape glyphs — U+25BA, U+25C4,
 * U+2192, U+21D2, U+25BC and the em dash — at two cells. A line carrying
 * one of them is a cell longer than a line of the same character count
 * without one, so a box that is square in the editor renders crooked, and
 * nothing in the source shows it. Measured: the Kerberos figure had six
 * such lines, each exactly 7px out at 14px type.
 *
 * The rule that falls out: draw with box characters and ASCII arrowheads
 * (`->`, `<-`, `>`, `v`), never Unicode arrows. This is what enforces it.
 *
 * It serves dist/ from inside this process rather than expecting a
 * preview server. An external one has to be started, waited for, and torn
 * down, and when it dies mid-run the failure looks exactly like a broken
 * page — a different one on every pass, which is a bad hour.
 *
 * Needs playwright, which is not a project dependency: this is a check
 * you run, not part of the build. NODE_PATH can point at any install.
 */

import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const DIST = resolve(import.meta.dirname, "..", "dist");

const TYPES = {
    ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
    ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2",
    ".xml": "application/xml", ".json": "application/json", ".txt": "text/plain",
};

/** Read the tree once. A stat per request runs out of descriptors. */
async function index(dir, prefix = "") {
    const files = new Map();
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const abs = join(dir, entry.name);
        const rel = `${prefix}/${entry.name}`;
        if (entry.isDirectory()) {
            for (const [k, v] of await index(abs, rel)) files.set(k, v);
        } else {
            files.set(rel, abs);
        }
    }
    return files;
}

async function serveDist() {
    let files;
    try {
        files = await index(DIST);
    } catch {
        throw new Error("No dist/. Run `npm run build` first.");
    }
    const find = (pathname) => {
        const clean = pathname.replace(/\/+$/, "");
        return files.get(pathname) ?? files.get(clean) ??
            files.get(`${clean}/index.html`) ?? files.get(`${clean}.html`) ??
            (clean === "" ? files.get("/index.html") : null) ?? null;
    };
    const server = createServer(async (req, res) => {
        const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
        const file = find(path);
        if (!file) {
            res.writeHead(404).end("not found");
            return;
        }
        res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
        res.end(await readFile(file));
    });
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    return { server, base: `http://127.0.0.1:${server.address().port}` };
}

const PAGES = process.argv.slice(2).filter((a) => a.startsWith("/"));
if (!PAGES.length) {
    PAGES.push(
        "/blog/kerberos-attacks",
        "/blog/home-server-guide",
        "/blog/ransomhub-esxi",
        "/pt-br/blog/kerberos-attacks",
        "/pt-br/blog/home-server-guide",
        "/pt-br/blog/ransomhub-esxi",
    );
}

const external = process.env.BASE;
const serving = external ? null : await serveDist();
const BASE = external ?? serving.base;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

let figures = 0;
let broken = 0;

for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const found = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll("pre.ascii, figure pre").forEach((pre, index) => {
            const style = getComputedStyle(pre);
            const probe = document.createElement("span");
            probe.style.cssText = "position:absolute;white-space:pre;visibility:hidden";
            probe.style.fontFamily = style.fontFamily;
            probe.style.fontSize = style.fontSize;
            document.body.append(probe);

            probe.textContent = "M";
            const cell = probe.getBoundingClientRect().width;

            const wide = [];
            for (const ch of new Set(pre.textContent)) {
                if (ch === "\n" || ch === " ") continue;
                probe.textContent = ch;
                const ratio = probe.getBoundingClientRect().width / cell;
                if (Math.abs(ratio - 1) > 0.02) {
                    wide.push({
                        ch,
                        cp: "U+" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"),
                        ratio: +ratio.toFixed(2),
                    });
                }
            }
            probe.remove();
            out.push({ index, cell: +cell.toFixed(2), size: style.fontSize, wide });
        });
        return out;
    });

    for (const fig of found) {
        figures++;
        if (!fig.wide.length) continue;
        broken++;
        console.log(`${path}  figure ${fig.index}  (${fig.size}, cell ${fig.cell}px)`);
        for (const w of fig.wide) {
            console.log(`    ${w.cp}  ${JSON.stringify(w.ch)}  ${w.ratio} cells`);
        }
    }
}

console.log(
    `\n${figures} figures across ${PAGES.length} pages` +
        (broken
            ? `\n${broken} contain characters that are not one cell wide`
            : "\nevery character in every figure is exactly one cell"),
);

await browser.close();
serving?.server.close();
process.exit(broken ? 1 : 0);
