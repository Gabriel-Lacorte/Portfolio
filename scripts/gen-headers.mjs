#!/usr/bin/env node
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

const INLINE = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
const EXECUTABLE = (attrs) => {
    const type = /\btype=["']([^"']+)["']/.exec(attrs)?.[1];
    return !type || type === "module" || /javascript|ecmascript/i.test(type);
};

const hashes = new Set();
for (const file of walk(DIST)) {
    for (const [, attrs, body] of readFileSync(file, "utf8").matchAll(INLINE)) {
        if (!EXECUTABLE(attrs)) continue;
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
            source: "/buttons/(.*)",
            headers: [
                { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Cache-Control", value: "public, max-age=604800" },
            ],
        },
        {
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
            "vercel.json is stale, the inline script changed and the CSP hash did not.\n" +
                "Run: node scripts/gen-headers.mjs",
        );
        process.exit(1);
    }
    console.log(`vercel.json matches the build (${hashes.size} inline script hash(es))`);
} else {
    writeFileSync(OUT, json);
    console.log(`vercel.json written, ${hashes.size} inline script hash(es) in the CSP`);
    for (const h of hashes) console.log(`   ${h}`);
}
