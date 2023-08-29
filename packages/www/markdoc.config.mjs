import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
// import { image } from './src/lib/markdoc';

/** @type {import('@markdoc/markdoc').Config} */
export default defineMarkdocConfig({
  functions: {
    customImage: {
      async transform(parameters) {
        const [markdocData, src, alt] = Object.assign([], parameters);
        if (!markdocData) { return }

        return "hello world!";
      },
    },
  }
});
