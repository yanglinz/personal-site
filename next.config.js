const path = require("path");

const withPrefresh = require("@prefresh/next");
const preact = require("preact");
const withPreact = require("next-plugin-preact");

const preactConfig = withPreact({
  experimental: {
    modern: true,
  },
});

module.exports = {
  // Use preact instead of React
  ...preactConfig,

  // Sass options
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },

  // Some routing configs
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/using-honeycomb/",
        destination: "/posts/using-honeycomb/",
        permanent: true,
      },
      {
        source: "/cloudflare-workers/",
        destination: "/posts/cloudflare-workers/",
        permanent: true,
      },
      {
        source: "/service-boundaries/",
        destination: "/posts/service-boundaries/",
        permanent: true,
      },
      {
        source: "/component-local-reducer/",
        destination: "/posts/component-local-reducer/",
        permanent: true,
      },
      {
        source: "/hello-blog/",
        destination: "/posts/hello-blog/",
        permanent: true,
      },
    ];
  },
};
