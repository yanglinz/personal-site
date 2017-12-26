const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const select = require(`unist-util-select`);
const fs = require(`fs-extra`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const projectPost = path.resolve("./src/templates/project-post.js");
  const blogPost = path.resolve("./src/templates/blog-post.js");

  const CREATE_PAGES_QUERY = `
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              path
            }
          }
        }
      }
    }
  `;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(CREATE_PAGES_QUERY).then(result => {
        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        _.each(result.data.allMarkdownRemark.edges, edge => {
          const { fileAbsolutePath, frontmatter } = edge.node;

          let component;
          if (_.includes(fileAbsolutePath, "/src/posts/")) {
            component = blogPost;
          } else if (_.includes(fileAbsolutePath, "/src/projects/")) {
            component = projectPost;
          }

          createPage({
            path: frontmatter.path,
            component,
            context: {
              path: frontmatter.path
            }
          });
        });
      })
    );
  });
};
