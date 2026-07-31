import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://lacorte.city",
    integrations: [sitemap(), mdx()],

    /* Posts used to be served under their directory names, numeric prefix
       and all. The prefixes order the source tree; they have no business
       in a URL. Anything already shared against the old paths still
       resolves. */
    redirects: {
        "/blog/00-kerberos-attacks": "/blog/kerberos-attacks",
        "/blog/01-home-server-guide": "/blog/home-server-guide",
        "/blog/02-ransomhub-ransomware": "/blog/ransomhub-esxi",
    },

    markdown: {
        shikiConfig: {
            // Colours come from --astro-code-* in global.css, so syntax
            // highlighting follows the theme toggle instead of being baked in.
            theme: "css-variables",
        },
    },
});
