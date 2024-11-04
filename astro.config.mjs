import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    integrations: [tailwind(), sitemap(), mdx()],
    markdown: {
        shikiConfig: {
            theme: "css-variables",
        },
    },
});
