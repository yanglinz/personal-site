import React from "react";
import { PostMetadata } from "@blog-engine/manifest";

import Layout from "../src/screens/Home/Layout";

export async function getStaticProps() {
  const manifest = await import("@blog-engine/manifest");
  const posts = await manifest.getPostList();
  return { props: { posts } };
}

interface ComponentProps {
  posts: PostMetadata[];
}

function Index(props: ComponentProps) {
  return <Layout posts={props.posts} />;
}

export default Index;
