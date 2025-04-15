import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

/** @type {import('@markdoc/markdoc').Config} */
export default defineMarkdocConfig({
  // Match syntax highlight to astro.config.mjs
  extends: [
    shiki({
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "solarized-light",
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
    }),
  ],
  nodes: {
    document: {
      ...nodes.document,
      // Don't wrap the output of markdoc posts with <article> tag
      render: null,
    },
  },
  tags: {
    iframe: {
      render: component("./src/components/EntryContentIframe.astro"),
      attributes: {
        src: { type: String },
        height: { type: String },
        design: { type: String },
      },
    },
    optimizedImage: {
      render: component("./src/components/EntryContentImage.astro"),
      attributes: {
        mdocContext: { type: Object },
        path: { type: String },
        alt: { type: String },
      },
    },
  },
});
