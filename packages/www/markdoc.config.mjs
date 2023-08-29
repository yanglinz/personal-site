import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import { image } from './src/lib/markdoc';

/** @type {import('@markdoc/markdoc').Config} */
export default defineMarkdocConfig({
  functions: {
    customImage: {
      transform(parameters) {
        const [context, src, alt] = Object.assign([], parameters);
        if (!context) { return }

        console.log(context);
        return context.slug;
      },
    },
  }
});
