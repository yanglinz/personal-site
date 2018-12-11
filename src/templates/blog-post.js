import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../app/layout";

import "./blog-post.scss";

export const BLOG_POST_QUERY = graphql`
  query BlogPostTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

function BlogPostTemplate(props) {
  const post = props.data.markdownRemark;
  return (
    <Layout>
      <main>
        <article className="BlogPost">
          <div className="l-wide">
            <div className="BlogPost-metadata">
              <h1 className="BlogPost-title">
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              </h1>

              <time className="BlogPost-date">{post.frontmatter.date}</time>
            </div>
          </div>

          <div className="l-wide">
            <div
              className="BlogPost-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </article>
      </main>
    </Layout>
  );
}

export default BlogPostTemplate;
