import React from "react";

import ContentHTML from "../../publishable/blog-engine/components/ContentHTML";

type TODO = any;

const postId = "utils-antipattern";

export async function getStaticProps() {
  const manifest = await import("../../publishable/blog-engine/manifest");
  const content = await manifest.getPostContent(postId, "index.md");
  return { props: { content } };
}

export default function Page(props: TODO) {
  const { content } = props;
  return <ContentHTML htmlAst={content.ast} />;
}
