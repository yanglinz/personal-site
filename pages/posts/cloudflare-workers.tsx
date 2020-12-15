import React from "react";

import ContentHTML from "../../publishable/blog-engine/components/ContentHTML";

export async function getStaticProps() {
  const manifest = await import("../../publishable/blog-engine/manifest");
  const content = await manifest.getPostContent("cloudflare-workers", "index.md");
  return { props: { content } };
}

export default function Page(props) {
  const { content } = props;
  return <ContentHTML htmlAst={content.hast} />;
}
