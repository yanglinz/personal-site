import React from "react";
import { graphql } from "gatsby";

import Layout from "../app/layout";
import Intro from "../app/intro";

export const QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;

function IndexPage() {
  return (
    <Layout>
      <Intro />
    </Layout>
  );
}

export default IndexPage;
