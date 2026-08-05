import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "@consts";
import { UI } from "@i18n/ui";
import { localised } from "@i18n/utils";
import { postsFor } from "@lib/posts";

export async function GET(context: APIContext) {
    const posts = await postsFor("pt-br");
    return rss({
        title: SITE.HANDLE,
        description: UI["pt-br"]["meta.blogDescription"],
        /* Item links are absolute paths, so they resolve against the
           origin without picking up /pt-br/ twice. */
        site: new URL("/pt-br/", context.site!),
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            /* Directory routes: without the trailing slash every entry
               points one redirect away from the article. */
            link: `${localised(`/blog/${post.data.translationKey}`, "pt-br")}/`,
        })),
        customData: "<language>pt-BR</language>",
    });
}
