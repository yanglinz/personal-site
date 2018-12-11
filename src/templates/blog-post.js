import React from "react";
import { graphql } from "gatsby";

export const BLOG_POST_QUERY = graphql`
  query BlogPostTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

function BlogPostTemplate(props) {
  const post = props.data.markdownRemark;
  return <h1>{post.frontmatter.title}</h1>;
}

export default BlogPostTemplate;
