import React from "react";

import {
  ContentScope,
  ContentHTML,
} from "../../publishable/blog-engine/components/post";

const postId = "hello-blog";

export async function getStaticProps() {
  const manifest = await import("../../publishable/blog-engine/manifest");
  const content = await manifest.getPostContent(postId, "index.md");
  return { props: { content } };
}

export default function Page(props) {
  const { content } = props;
  return (
    <ContentScope postId={postId}>
      <ContentHTML htmlAst={content.hast} />
    </ContentScope>
  );
}
