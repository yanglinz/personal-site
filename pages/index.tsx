import React from "react";

import Layout from "./_layout";
import About from "../src/screens/Home/About";
import Intro from "../src/screens/Home/Intro";
import PostList from "../src/screens/Home/PostList";
import Section from "../src/screens/Home/Section";

type TODO = any;

export async function getStaticProps() {
  const manifest = await import("../publishable/blog-engine/manifest");
  const posts = await manifest.getPostList();
  return { props: { posts } };
}

function Index(props: TODO) {
  const posts: TODO = props.posts;
  return (
    <Layout>
      <Intro />

      <Section title="About">
        <About />
      </Section>

      <Section title="Blog Posts">
        <PostList posts={posts} />
      </Section>
    </Layout>
  );
}

export default Index;
