import { defineConfig } from "astro/config";
import { globalConfigIntegration } from './src/lib/astro';

import markdoc from "@astrojs/markdoc";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://yanglinzhao.com',
  integrations: [globalConfigIntegration(), markdoc(), tailwind(), sitemap()],
});
