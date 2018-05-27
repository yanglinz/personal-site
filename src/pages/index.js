import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import Helmet from "react-helmet";

import Intro from "../components/intro";

// import "../styles/main.scss";

export const pageQuery = graphql`
  fragment indexPostInfo on MarkdownRemarkConnection {
    edges {
      node {
        excerpt
        frontmatter {
          title
          path
          tags
          date: date(formatString: "MMM Do, YYYY")
        }
      }
    }
  }

  query IndexQuery {
    projectPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/projects/**" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...indexPostInfo
    }
    blogPosts: allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/src/posts/**" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...indexPostInfo
    }
  }
`;

function Posts(props) {
  const { data } = props;

  return (
    <section className="Posts">
      <h2 className="Posts-title">Blog Posts</h2>

      {data.blogPosts.edges.map(edge => {
        const post = edge.node;
        const { title, date, path, tags } = post.frontmatter;

        return (
          <article className="Posts-post">
            <header className="Posts-post-title">
              <Link to={path}>
                <h3>{title}</h3>
              </Link>
            </header>

            <div className="Posts-post-excerpt">{post.excerpt}</div>

            <div className="Posts-post-date">{date}</div>

            <div className="Posts-post-tags">
              <ul>
                {tags.map(t => (
                  <li>
                    <p className="Posts-post-tags">{t}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </section>
  );
}

class Index extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Intro />
        <Posts data={data} />
      </div>
    );
  }
}

export default Index;
