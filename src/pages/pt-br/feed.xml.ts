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
        site: context.site!,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: localised(`/blog/${post.data.translationKey}`, "pt-br"),
        })),
        customData: "<language>pt-BR</language>",
    });
}
