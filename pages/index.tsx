import React from "react";
import { PostMetadata } from "@blog-engine/manifest";

import Layout from "../src/screens/Home/Layout";
import About from "../src/screens/Home/About";
import Intro from "../src/screens/Home/Intro";
import PostList from "../src/screens/Home/PostList";
import Section from "../src/screens/Home/Section";

export async function getStaticProps() {
  const manifest = await import("@blog-engine/manifest");
  const posts = await manifest.getPostList();
  return { props: { posts } };
}

interface ComponentProps {
  posts: PostMetadata[];
}

function Index(props: ComponentProps) {
  return (
    <Layout>
      <Intro />

      <Section title="About">
        <About />
      </Section>

      <Section title="Blog Posts">
        <PostList posts={props.posts} />
      </Section>
    </Layout>
  );
}

export default Index;
