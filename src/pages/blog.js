import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

// import "../styles/main.scss";

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
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

class Blog extends React.Component {
  render() {
    const { data } = this.props;
    const posts = get(data, "allMarkdownRemark.edges");

    return (
      <div>
        <Helmet title={get(data, "site.siteMetadata.title")} />
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

export default Blog;
