import React from "react";
import Image from "next/image";

import Layout from "../../src/screens/Post/Layout";

type TODO = any;

const postId = "hello-blog";

export async function getStaticProps() {
  const data = await import("../../publishable/blog-engine/next/prerender");
  return await data.getStaticProps(postId);
}

export default function Page(props: TODO) {
  const { content, metadata } = props;
  return (
    <Layout content={content} metadata={metadata}>
      <Image
        src="/content/hello-blog/banner.jpeg"
        alt="Open road"
        layout="responsive"
        width={500}
        height={300}
      />
    </Layout>
  );
}
