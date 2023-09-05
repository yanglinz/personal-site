import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

/** @type {import('@markdoc/markdoc').Config} */
export default defineMarkdocConfig({
  // Don't wrap the output of markdoc posts with <article> tag
  nodes: {
    document: {
      ...nodes.document,
      render: null,
    },
    
    blockquote: {
      ...nodes.blockquote,
      render: component('./src/components/PostContentQuote.astro'),
    }
  },
  // Match syntax highlight to astro.config.mjs
  extends: [
    shiki({
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "solarized-light",
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
    }),
  ],
  tags: {
    image: {
      render: component("./src/components/ImageForPost.astro"),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        mdocContext: { type: Object },
        src: { type: String },
        alt: { type: String },
      },
    },
  },
});
