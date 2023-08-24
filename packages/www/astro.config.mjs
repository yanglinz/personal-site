import { defineConfig } from "astro/config";

import markdoc from '@astrojs/markdoc';
// import markdoc from './astro/custom-markdoc-integration/src/index';

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc()],
});
