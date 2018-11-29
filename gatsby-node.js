const path = require("path");

const _ = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

function createPages({ graphql, actions }) {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js");

    const PAGES_QUERY = graphql`
      query PagesQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `;

    resolve(PAGES_QUERY).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges;
      _.each(posts, (post, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: post.node.fields.slug,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next
          }
        });
      });
    });
  });
}

function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value
    });
  }
}

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
