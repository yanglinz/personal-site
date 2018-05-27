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

function BlogPosts(props) {
  const { data } = props;

  return (
    <section>
      <h2>Blog Posts</h2>

      {data.blogPosts.edges.map(edge => {
        const post = edge.node;
        const { title, date, path, tags } = post.frontmatter;
        return (
          <article>
            <header>
              <Link to={path}>
                <p>{title}</p>
              </Link>
            </header>

            <p>{date}</p>

            <ul>
              {tags.map(t => (
                <li>
                  <p>{t}</p>
                </li>
              ))}
            </ul>
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
        <BlogPosts data={data} />
      </div>
    );
  }
}

export default Index;
