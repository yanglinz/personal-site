import React from "react";
import { graphql } from "gatsby";

import Layout from "../app/layout";
import Intro from "../components/intro";
import PostList from "../components/post-list";
import * as env from "../app/env";

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
            publish
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
  let posts = data.allMarkdownRemark.edges;
  posts = posts.map(p => p.node);

  if (!env.DEV) {
    posts = posts.filter(p => p.frontmatter.publish);
  }

  return posts;
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
