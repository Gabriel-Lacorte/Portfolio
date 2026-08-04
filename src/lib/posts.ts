import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@i18n/utils";

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

/**
 * The locales that answer at this post's URL with someone else's text,
 * every locale with no translation of its own, which under the fallback
 * above still serves the original.
 *
 * Used to keep those routes out of the hreflang set. A page claiming to
 * be the Portuguese article while showing English is worse than no
 * claim at all: it sends every Brazilian searcher to a page they cannot
 * read and tells the engine that is deliberate.
 */
export async function borrowingLocales(post: Post): Promise<Locale[]> {
    const all = await getCollection("blog");
    const written = new Set(
        all
            .filter((p) => p.data.translationKey === post.data.translationKey)
            .map(localeOf),
    );
    return LOCALES.filter((code) => !written.has(code));
}

function sort(posts: Post[]) {
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
