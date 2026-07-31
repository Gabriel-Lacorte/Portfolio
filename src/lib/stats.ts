import { getCollection } from "astro:content";
import { execFileSync } from "node:child_process";

/**
 * Build-time facts about the site. Everything here is resolved once during
 * the static build — nothing ships to the client.
 */

export type SiteStats = {
    posts: number;
    words: number;
    commit: string;
    built: string;
    latest: string | null;
};

/** Close enough for a word count, and stable: strips frontmatter, fenced
 *  code, and inline markup before counting. */
export function countWords(body: string): number {
    const prose = body
        .replace(/^---[\s\S]*?---/, "")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`[^`]*`/g, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/[#*_>[\]()!|-]/g, " ");

    return prose.split(/\s+/).filter(Boolean).length;
}

/** Reading time in whole minutes, floored at 1. */
export function readingTime(body: string): number {
    return Math.max(1, Math.round(countWords(body) / 200));
}

function gitShortHash(): string {
    try {
        // execFileSync, not execSync: no shell is spawned at all.
        return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
            stdio: ["ignore", "pipe", "ignore"],
        })
            .toString()
            .trim();
    } catch {
        // Building outside a git checkout (a clean CI export, say).
        return "unknown";
    }
}

export async function getStats(): Promise<SiteStats> {
    const posts = (await getCollection("blog")).filter(
        (post) => !post.data.draft,
    );

    const words = posts.reduce((sum, p) => sum + countWords(p.body), 0);

    const latest = posts
        .map((p) => p.data.date)
        .sort((a, b) => b.valueOf() - a.valueOf())[0];

    return {
        posts: posts.length,
        words,
        commit: gitShortHash(),
        built: new Date().toISOString().slice(0, 10),
        latest: latest ? latest.toISOString().slice(0, 10) : null,
    };
}

/** 8_432 -> "8.4k" */
export function compact(n: number): string {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}
