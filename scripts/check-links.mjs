#!/usr/bin/env node
/**
 * Checks every link in the built site.
 *
 *     npm run build
 *     node scripts/check-links.mjs            # internal only, offline
 *     node scripts/check-links.mjs --external # also hits the network
 *
 * No dependencies: it reads dist/ and uses the global fetch. Internal
 * links are resolved against the files that were actually written, so a
 * typo or a renamed post fails here rather than in someone's browser.
 *
 * This exists because a link rotted in public. The home-server post
 * pointed at debian-12.5.0-amd64-netinst.iso under `current/`, and
 * `current` had since become Debian 13 — a 404 in a guide whose whole
 * first step is "download this". Pinning a filename to a directory that
 * moves is the bug; the check is the net under it.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const CHECK_EXTERNAL = process.argv.includes("--external");

/* The site's own host, so canonical URLs and og:url are checked against
   the build rather than fetched. Fetching them checks what is deployed,
   which on an unmerged branch is a different site — every new route came
   back 404 from production and none of it was a fault in this build. */
const SITE_HOST = (await readFile(join(ROOT, "astro.config.mjs"), "utf8"))
    .match(/site:\s*["'](https?:\/\/[^"']+)["']/)?.[1];
const OWN_HOST = SITE_HOST ? new URL(SITE_HOST).hostname : null;

/* Hosts that answer bots with a status they would never send a browser.
   LinkedIn returns 999 to anything without a session. Treating that as
   dead would make the check cry wolf, and a check nobody trusts is
   worse than no check. */
const BOT_HOSTILE = [/(^|\.)linkedin\.com$/];

/* Links that are examples in prose, not destinations. */
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

/* A directory route is written as <route>/index.html, so /blog has to
   resolve through /blog/index.html and /blog/ likewise. */
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
                /* GET, not HEAD: plenty of servers answer HEAD with 405
                   while serving the page perfectly well. */
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
