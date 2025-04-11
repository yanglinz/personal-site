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
    optimizedImage: {
      render: component("./src/components/PostContentImage.astro"),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        mdocContext: { type: Object },
        path: { type: String },
        alt: { type: String },
      },
    },
  },
});
