#!/usr/bin/env node
/**
 * Checks that every character in an ASCII figure occupies exactly one
 * cell in the font that actually renders it.
 *
 *     npm run build && npm run preview
 *     node scripts/check-figures.mjs
 *
 * The figures are the one drawn thing on this site, and they only work if
 * a column is a column. That is not guaranteed by using a monospace face:
 * Iosevka draws the arrow and geometric-shape glyphs — U+25BA, U+25C4,
 * U+2192, U+21D2 and their neighbours — at two cells. A line carrying one
 * of them is one cell longer than a line of the same character count
 * without one, so a box that is square in the editor renders crooked, and
 * nothing in the source shows it. Measured: the Kerberos figure had six
 * such lines, each exactly 7px out at 14px type.
 *
 * The rule that falls out: draw with box characters and ASCII arrowheads
 * (`->`, `<-`, `>`), never Unicode arrows. This is what enforces it.
 *
 * Needs playwright, which is not a project dependency — it is a check you
 * run, not part of the build. NODE_PATH can point at any install.
 */

import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:4321";
const PAGES = process.argv.slice(2);

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
            probe.style.cssText =
                "position:absolute;white-space:pre;visibility:hidden";
            probe.style.font = style.font;
            probe.style.fontFamily = style.fontFamily;
            probe.style.fontSize = style.fontSize;
            document.body.append(probe);

            probe.textContent = "M";
            const cell = probe.getBoundingClientRect().width;

            const seen = new Map();
            for (const ch of new Set(pre.textContent)) {
                if (ch === "\n" || ch === " ") continue;
                probe.textContent = ch;
                const ratio = probe.getBoundingClientRect().width / cell;
                if (Math.abs(ratio - 1) > 0.02) {
                    seen.set(ch, +ratio.toFixed(2));
                }
            }
            probe.remove();

            out.push({
                index,
                cell: +cell.toFixed(2),
                size: style.fontSize,
                wide: [...seen.entries()].map(([ch, ratio]) => ({
                    ch,
                    cp: "U+" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"),
                    ratio,
                })),
            });
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
process.exit(broken ? 1 : 0);
