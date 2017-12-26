import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

import Header from "../components/header";
import Intro from "../components/intro";

import "../styles/main.scss";

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
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

class Index extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = get(data, "site.siteMetadata.title");

    console.log("data", data);

    return (
      <div>
        <Helmet title={get(data, "site.siteMetadata.title")} />
        <Header siteTitle={siteTitle} location={location} />

        <Intro />
        <hr />

        <section>
          <div className="l-wrapper">
            <div className="l-inner-narrow">
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
            </div>
          </div>
        </section>
        <hr />

        <section>
          <div className="l-wrapper">
            <div className="l-inner-narrow">
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
            </div>
          </div>
        </section>
        <hr />
      </div>
    );
  }
}

Index.propTypes = {
  route: React.PropTypes.object
};

export default Index;
