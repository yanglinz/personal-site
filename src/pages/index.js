import React from "react";
import { graphql } from "gatsby";

import Layout from "../app/layout";
import Intro from "../components/intro";
import PostList from "../components/post-list";

export const INDEX_QUERY = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM.DD.YYYY")
            title
          }
        }
      }
    }
  }
`;

function parsePosts(data) {
  const posts = data.allMarkdownRemark.edges;
  return posts.map(p => p.node);
}

function IndexPage(props) {
  return (
    <Layout>
      <Intro />
      <PostList posts={parsePosts(props.data)} />
    </Layout>
  );
}

export default IndexPage;
