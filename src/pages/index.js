import React from "react";
import { graphql } from "gatsby";

import Layout from "../app/layout";
import Intro from "../components/intro";
import PostList from "../components/post-list";

import "./index.scss";

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

function Section(props) {
  const { title, children } = props;
  return (
    <div className="Section">
      <div className="l-wide">
        <h2 className="Section-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function parsePosts(data) {
  const posts = data.allMarkdownRemark.edges;
  return posts.map(p => p.node);
}

function IndexPage(props) {
  return (
    <Layout>
      <Intro />
      <Section title="Blog Posts">
        <PostList posts={parsePosts(props.data)} />
      </Section>
    </Layout>
  );
}

export default IndexPage;
