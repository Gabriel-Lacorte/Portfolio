import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "@consts";
import { UI } from "@i18n/ui";
import { localised } from "@i18n/utils";
import { postsFor } from "@lib/posts";

/* Portuguese edition of the courtesy feed. Untranslated posts fall back
   to the English original, same as the pages do. */
export async function GET(context: APIContext) {
    const posts = await postsFor("pt-br");
    return rss({
        title: SITE.HANDLE,
        description: UI["pt-br"]["meta.blogDescription"],
        /* The channel link is the Portuguese site, not the English one.
           Item links are absolute paths, so they still resolve against
           the origin and do not pick up the /pt-br/ prefix twice. */
        site: new URL("/pt-br/", context.site!),
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            /* Trailing slash: the build makes directory routes, so
               without it every entry points one redirect away from the
               article — same trap the hreflang tags fell into. */
            link: `${localised(`/blog/${post.data.translationKey}`, "pt-br")}/`,
        })),
        customData: "<language>pt-BR</language>",
    });
}
