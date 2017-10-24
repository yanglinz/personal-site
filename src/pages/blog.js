import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

import Header from "../components/header";

export const pageQuery = graphql`
  query BlogQuery {
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
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

class Blog extends React.Component {
  render() {
    const { data, location } = this.props;
    const siteTitle = get(data, "site.siteMetadata.title");
    const posts = get(data, "allMarkdownRemark.edges");

    return (
      <div>
        <Helmet title={get(data, "site.siteMetadata.title")} />
        <Header siteTitle={siteTitle} location={location} />
        {posts.map(post => {
          if (post.node.path !== "/404/") {
            const title = get(post, "node.frontmatter.title") || post.node.path;
            return (
              <div key={post.node.frontmatter.path}>
                <h3>
                  <Link to={post.node.frontmatter.path}>
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

Blog.propTypes = {
  route: React.PropTypes.object
};

export default Blog;
