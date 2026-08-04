import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "@consts";
import { UI } from "@i18n/ui";
import { localised } from "@i18n/utils";
import { postsFor } from "@lib/posts";

/* The feed is a courtesy, not a funnel: subscription on the reader's
   terms. One per locale; this is the English one. */
export async function GET(context: APIContext) {
    const posts = await postsFor("en");
    return rss({
        title: SITE.HANDLE,
        description: UI.en["meta.blogDescription"],
        site: context.site!,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            /* Trailing slash: directory routes, so without it every
               entry points one redirect away from the article. */
            link: `${localised(`/blog/${post.data.translationKey}`, "en")}/`,
        })),
        customData: "<language>en</language>",
    });
}
