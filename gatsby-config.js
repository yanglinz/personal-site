module.exports = {
  siteMetadata: {
    title: "Yanglin Zhao"
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
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [`${__dirname}/src`]
      }
    },

    // Transformers
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark"
    }
  ]
};
