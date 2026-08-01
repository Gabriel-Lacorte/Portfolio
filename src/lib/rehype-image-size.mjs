/**
 * Stamps every root-relative <img> in a post with the real pixel size of
 * the file in public/, plus lazy loading.
 *
 * Without width and height the browser does not know how tall an image
 * will be until the bytes arrive, so every one of them shoves the prose
 * down as it lands. It measures as CLS 0 on localhost, where the images
 * are there before the paint, and as a page that jumps three times on a
 * phone. The numbers have to come from the file, not from the author
 * remembering to type them — so they are read at build time.
 *
 * PNG only, deliberately: that is all the posts use, and reading a PNG
 * header is nine bytes of arithmetic against a dependency that would
 * have to be audited and updated forever. A non-PNG is left alone rather
 * than guessed at, and says so once in the build log.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { visit } from "unist-util-visit";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** IHDR is always the first chunk: width and height are big-endian at 16. */
function pngSize(file) {
    const head = readFileSync(file).subarray(0, 24);
    if (!head.subarray(0, 8).equals(PNG_MAGIC)) return null;
    return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
}

export default function rehypeImageSize({ root = "public" } = {}) {
    const warned = new Set();

    return (tree) => {
        visit(tree, "element", (node) => {
            if (node.tagName !== "img") return;

            const src = node.properties?.src;
            if (typeof src !== "string" || !src.startsWith("/")) return;

            /* Never overwrite what the author wrote by hand. */
            node.properties.loading ??= "lazy";
            node.properties.decoding ??= "async";
            if (node.properties.width && node.properties.height) return;

            if (!src.toLowerCase().endsWith(".png")) {
                if (!warned.has(src)) {
                    warned.add(src);
                    console.warn(`[image-size] not a PNG, left unsized: ${src}`);
                }
                return;
            }

            try {
                const size = pngSize(join(process.cwd(), root, src));
                if (!size) return;
                node.properties.width = size.width;
                node.properties.height = size.height;
            } catch {
                if (!warned.has(src)) {
                    warned.add(src);
                    console.warn(`[image-size] missing from ${root}: ${src}`);
                }
            }
        });
    };
}
