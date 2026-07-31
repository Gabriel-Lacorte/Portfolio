import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, type Locale } from "@i18n/utils";

export type Post = CollectionEntry<"blog">;

/** Entry ids look like "pt-br/00-kerberos-attacks/index.mdx". */
export function localeOf(post: Post): Locale {
    return post.id.split("/")[0] as Locale;
}

/**
 * Published posts for one locale, newest first.
 *
 * Translation is optional: a locale that has not translated a post still
 * lists the original rather than a gap, and the post page shows a notice.
 * That is what keeps a second locale from doubling the writing cost of
 * every post forever.
 */
export async function postsFor(locale: Locale, fallback = true) {
    const all = (await getCollection("blog")).filter((p) => !p.data.draft);

    const native = all.filter((p) => localeOf(p) === locale);
    if (!fallback || locale === DEFAULT_LOCALE) return sort(native);

    const have = new Set(native.map((p) => p.data.translationKey));
    const borrowed = all.filter(
        (p) =>
            localeOf(p) === DEFAULT_LOCALE &&
            !have.has(p.data.translationKey),
    );

    return sort([...native, ...borrowed]);
}

/** True when this entry is being shown to a locale it was not written in. */
export function isFallback(post: Post, locale: Locale) {
    return localeOf(post) !== locale;
}

function sort(posts: Post[]) {
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
