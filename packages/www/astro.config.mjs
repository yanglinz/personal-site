import { defineConfig } from "astro/config";

import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://yanglinzhao.com",
  integrations: [markdoc({ allowHTML: true }), sitemap()],

  markdown: {
    shikiConfig: {
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "solarized-light",
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
