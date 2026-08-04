#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const CHECK_EXTERNAL = process.argv.includes("--external");

const SITE_HOST = (await readFile(join(ROOT, "astro.config.mjs"), "utf8"))
    .match(/site:\s*["'](https?:\/\/[^"']+)["']/)?.[1];
const OWN_HOST = SITE_HOST ? new URL(SITE_HOST).hostname : null;

const BOT_HOSTILE = [/(^|\.)linkedin\.com$/];

const IGNORED = [/^https?:\/\/localhost(:\d+)?/, /^https?:\/\/(\d+\.){3}\d+/];

async function* walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(path);
        else yield path;
    }
}

const pages = [];
const files = new Set();
for await (const path of walk(DIST)) {
    files.add("/" + relative(DIST, path).replaceAll("\\", "/"));
    if (path.endsWith(".html")) pages.push(path);
}

const exists = (href) => {
    const path = href.split(/[?#]/)[0];
    const clean = path.endsWith("/") ? path.slice(0, -1) : path;
    return (
        files.has(path) ||
        files.has(clean) ||
        files.has(`${clean}/index.html`) ||
        files.has(`${clean}.html`) ||
        clean === ""
    );
};

const internal = new Map();
const external = new Map();

for (const path of pages) {
    const page = "/" + relative(DIST, path).replace(/index\.html$/, "");
    const html = await readFile(path, "utf8");
    for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        const url = m[1];
        if (url.startsWith("#") || url.startsWith("data:") || url.startsWith("mailto:")) continue;

        let key = url;
        let bucket = null;
        if (/^https?:\/\//.test(url)) {
            const parsed = new URL(url);
            if (OWN_HOST && parsed.hostname === OWN_HOST) {
                bucket = internal;
                key = parsed.pathname;
            } else {
                bucket = external;
            }
        } else if (url.startsWith("/")) {
            bucket = internal;
        }
        if (!bucket) continue;
        if (!bucket.has(key)) bucket.set(key, new Set());
        bucket.get(key).add(page);
    }
}

let broken = 0;

for (const [url, where] of internal) {
    if (!exists(url)) {
        broken++;
        console.log(`MISSING  ${url}\n         on ${[...where].join(", ")}`);
    }
}
console.log(`internal: ${internal.size} distinct, ${broken} missing`);

if (CHECK_EXTERNAL) {
    const targets = [...external].filter(
        ([url]) => !IGNORED.some((re) => re.test(url)),
    );
    const results = await Promise.all(
        targets.map(async ([url, where]) => {
            const host = new URL(url).hostname;
            if (BOT_HOSTILE.some((re) => re.test(host))) return { url, skipped: true };
            try {
                const res = await fetch(url, {
                    redirect: "follow",
                    signal: AbortSignal.timeout(20_000),
                    headers: { "user-agent": "Mozilla/5.0 (link check; lacorte.city)" },
                });
                return { url, where, status: res.status, ok: res.ok };
            } catch (err) {
                return { url, where, status: err.name, ok: false };
            }
        }),
    );
    let dead = 0;
    for (const r of results) {
        if (r.skipped || r.ok) continue;
        dead++;
        console.log(`DEAD ${r.status}  ${r.url}\n         on ${[...r.where].join(", ")}`);
    }
    const skipped = results.filter((r) => r.skipped).length;
    console.log(
        `external: ${results.length} checked, ${dead} dead` +
            (skipped ? `, ${skipped} skipped as bot-hostile` : ""),
    );
    broken += dead;
}

process.exit(broken ? 1 : 0);
