import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

/** @type {import('@markdoc/markdoc').Config} */
export default defineMarkdocConfig({
  tags: {
    image: {
      render: component('./src/components/ImageForPost.astro'),
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
