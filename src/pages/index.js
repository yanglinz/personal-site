import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

import Intro from "../components/intro";

// import "../styles/main.scss";

export const pageQuery = graphql`
  query IndexQuery {
    projectPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/projects/**" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
    blogPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/posts/**" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

function BlogPosts(props) {
  const { data } = props;

  return (
    <section>
      <h2>Blog Posts</h2>
      <ul>
        {data.blogPosts.edges.map(edge => {
          const post = edge.node;
          return (
            <li key={post.frontmatter.path}>
              <Link to={post.frontmatter.path}>
                <p>{post.frontmatter.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function PersonalProjects(props) {
  const { data } = props;

  return (
    <section>
      <h2>Personal Projects</h2>
      <ul>
        {data.projectPosts.edges.map(edge => {
          const post = edge.node;
          return (
            <li key={post.frontmatter.path}>
              <div>
                <Link to={post.frontmatter.path}>
                  <p>{post.frontmatter.title}</p>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

class Index extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Intro />
        <BlogPosts data={data} />
        <PersonalProjects data={data} />
      </div>
    );
  }
}

export default Index;
