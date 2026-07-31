import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://lacorte.city",
    integrations: [sitemap(), mdx()],
    markdown: {
        shikiConfig: {
            // Colours come from --astro-code-* in global.css, so syntax
            // highlighting follows the theme toggle instead of being baked in.
            theme: "css-variables",
        },
    },
});
