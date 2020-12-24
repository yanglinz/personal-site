import React from "react";
import Image from "next/image";

import ContentHTML from "../../publishable/blog-engine/components/ContentHTML";

const postId = "hello-blog";

export async function getStaticProps() {
  const manifest = await import("../../publishable/blog-engine/manifest");
  const content = await manifest.getPostContent(postId, "index.md");
  return { props: { content } };
}

export default function Page(props) {
  const { content } = props;
  return (
    <>
      <Image
        src="/content/hello-blog/banner.jpeg"
        alt="Open road"
        layout="responsive"
        width={500}
        height={300}
      />
      <ContentHTML htmlAst={content.ast} />
    </>
  );
}
