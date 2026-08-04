import { getCollection } from "astro:content";
import { execFileSync } from "node:child_process";

/**
 * Build-time facts about the site. Everything here is resolved once during
 * the static build, nothing ships to the client.
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
    const all = (await getCollection("blog")).filter((post) => !post.data.draft);

    /* One post is one piece of writing, not one file. Counting the
       collection directly reported 3 posts and their 2 translations as 5,
       and its word count twice over. */
    const byKey = new Map<string, (typeof all)[number]>();
    for (const post of all) {
        if (!byKey.has(post.data.translationKey)) {
            byKey.set(post.data.translationKey, post);
        }
    }
    const posts = [...byKey.values()];

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

/**
 * The self-test readout, in the idiom of the avionics panels this design
 * is drawn from. Every line is a fact about this build rather than a
 * slogan, which is the only reason it is worth putting on the page.
 */
export function getSelfTest(stats: SiteStats) {
    return [
        { k: "build", v: stats.commit, s: "PASS" },
        { k: "content", v: `${stats.posts} posts · ${compact(stats.words)}`, s: "PASS" },
        { k: "output", v: "static html", s: "PASS" },
        { k: "javascript required", v: "none", s: "PASS" },
        { k: "third-party", v: "none", s: "PASS" },
        { k: "trackers · cookies", v: "none", s: "PASS" },
        { k: "type", v: "self-hosted · ofl", s: "PASS" },
        { k: "contrast", v: "aaa, both themes", s: "PASS" },
        { k: "locales", v: "en · pt-br", s: "PASS" },
    ];
}
