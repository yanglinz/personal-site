module.exports = {
  siteMetadata: {
    author: "Yanglin Zhao",
    title: "Yanglin Zhao",
    description:
      "Yanglin Zhao is a Full Stack developer. This is his digital home to write about programming topics and post his projects."
  },
  plugins: [
    // Sources
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`
      }
    },

    // Plugins
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        includePaths: [`${__dirname}/src`]
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-140456696-1",
        head: false,
        exclude: [],
        sampleRate: 100,
        siteSpeedSampleRate: 100,
        cookieDomain: "yanglinzhao.com"
      }
    },

    // Transformers
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 660,
              linkImagesToOriginal: false,
              withWebp: true
            }
          },
          "gatsby-remark-prismjs"
        ],
        gfm: true,
        commonmark: true,
        footnotes: true,
        pedantic: true
      }
    }
  ]
};
