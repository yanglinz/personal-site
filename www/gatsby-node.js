const path = require("path");

const _ = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = function createPages({ graphql, actions }) {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postsQuery = `
      {
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
                publish
              }
            }
          }
        }
      }
    `;

    resolve(
      graphql(postsQuery).then(result => {
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        let posts = result.data.allMarkdownRemark.edges;
        if (process.env.NODE_ENV !== "development") {
          posts = posts.filter(post => {
            return post.node.frontmatter.publish;
          });
        }

        posts.forEach((post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
              slug: post.node.fields.slug,
              previous,
              next
            }
          });
        });
      })
    );
  });
};

exports.onCreateNode = function onCreateNode({ node, actions, getNode }) {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value
    });
  }
};
