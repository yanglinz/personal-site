import { defineConfig } from "astro/config";

import markdoc from '@astrojs/markdoc';
// TODO: Replace the official markdoc integration with our custom
// integration if we can't customize the component outputs.
// import markdoc from './astro/custom-markdoc-integration/src/index';

// https://astro.build/config
export default defineConfig({
  integrations: [markdoc()],
});
