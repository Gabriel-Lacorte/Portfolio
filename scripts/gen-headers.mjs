#!/usr/bin/env node
/**
 * Writes vercel.json from the build.
 *
 *     npm run build
 *     node scripts/gen-headers.mjs            # write it
 *     node scripts/gen-headers.mjs --check    # fail if it is stale
 *
 * The Content-Security-Policy carries a SHA-256 of every inline script in
 * dist/, which is why this is generated and not hand-written. There is
 * exactly one — the pre-paint theme script — and it has to stay inline or
 * the page flashes light before the stylesheet decides otherwise. Hashing
 * it is what lets script-src stay strict; `unsafe-inline` would hand any
 * injected <script> the same permission the theme script has.
 *
 * The hash and the script are two files apart, so editing one silently
 * breaks the other: the policy stops matching, the browser blocks the
 * script, and the only symptom is the theme flash coming back. --check
 * closes that gap and belongs in CI next to the build.
 *
 * style-src keeps 'unsafe-inline'. Astro emits scoped styles as inline
 * <style> blocks whose content changes with every component edit, and
 * chasing those hashes would break far more often than it would protect
 * anything: a stylesheet cannot exfiltrate.
 */

import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const OUT = join(ROOT, "vercel.json");
const CHECK = process.argv.includes("--check");

function* walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(path);
        else if (entry.name.endsWith(".html")) yield path;
    }
}

/* Only scripts with no src attribute: those are the ones a CSP hash
   covers. Anything with a src is governed by 'self'. */
const INLINE = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;

const hashes = new Set();
for (const file of walk(DIST)) {
    for (const [, body] of readFileSync(file, "utf8").matchAll(INLINE)) {
        hashes.add(`'sha256-${createHash("sha256").update(body).digest("base64")}'`);
    }
}

const csp = [
    "default-src 'none'",
    `script-src 'self' ${[...hashes].sort().join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
].join("; ");

/* Everything the site does not use, turned off rather than left default. */
const permissions = [
    "accelerometer", "autoplay", "camera", "display-capture", "encrypted-media",
    "fullscreen", "geolocation", "gyroscope", "magnetometer", "microphone",
    "midi", "payment", "picture-in-picture", "usb", "xr-spatial-tracking",
].map((f) => `${f}=()`).join(", ");

const config = {
    $schema: "https://openapi.vercel.sh/vercel.json",
    headers: [
        {
            source: "/(.*)",
            headers: [
                { key: "Content-Security-Policy", value: csp },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "no-referrer" },
                { key: "Permissions-Policy", value: permissions },
                { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload",
                },
            ],
        },
        {
            /* The 88x31 buttons say "free to hotlink" in their own alt
               text, and Cross-Origin-Resource-Policy: same-origin is
               precisely the header that stops that working. The webring
               only functions if other people's pages can load the image,
               so this one directory opts back out. */
            source: "/buttons/(.*)",
            headers: [
                { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Cache-Control", value: "public, max-age=604800" },
            ],
        },
        {
            /* Fingerprinted filenames, so they can be cached for ever.
               Everything else stays revalidated — a portfolio that serves
               a stale front page is worse than one that serves it twice. */
            source: "/_astro/(.*)",
            headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
            ],
        },
        {
            source: "/fonts/(.*)",
            headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
            ],
        },
    ],
};

const json = JSON.stringify(config, null, 4) + "\n";

if (CHECK) {
    let current = "";
    try {
        current = readFileSync(OUT, "utf8");
    } catch {
        console.log("vercel.json is missing. Run: node scripts/gen-headers.mjs");
        process.exit(1);
    }
    if (current !== json) {
        console.log(
            "vercel.json is stale — the inline script changed and the CSP hash did not.\n" +
                "Run: node scripts/gen-headers.mjs",
        );
        process.exit(1);
    }
    console.log(`vercel.json matches the build (${hashes.size} inline script hash(es))`);
} else {
    writeFileSync(OUT, json);
    console.log(`vercel.json written — ${hashes.size} inline script hash(es) in the CSP`);
    for (const h of hashes) console.log(`   ${h}`);
}
