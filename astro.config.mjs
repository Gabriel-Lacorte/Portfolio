import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeImageSize from "./src/lib/rehype-image-size.mjs";

export default defineConfig({
    site: "https://lacorte.city",
    integrations: [
        sitemap({
            filter: (page) => !/\/404\/?$/.test(new URL(page).pathname),
        }),
        mdx(),
    ],

    i18n: {
        defaultLocale: "en",
        locales: ["en", "pt-br"],
        routing: { prefixDefaultLocale: false },
    },

    redirects: {
        "/blog/00-kerberos-attacks": "/blog/kerberos-attacks/",
        "/blog/01-home-server-guide": "/blog/home-server-guide/",
        "/blog/02-ransomhub-ransomware": "/blog/ransomhub-esxi/",
    },

    markdown: {
        processor: unified({ rehypePlugins: [rehypeImageSize] }),
        shikiConfig: {
            theme: "css-variables",
        },
    },
});
