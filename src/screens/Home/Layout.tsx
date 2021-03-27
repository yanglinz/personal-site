import React from "react";
import Head from "next/head";
import { PostMetadata } from "@blog-engine/manifest";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Intro from "./Intro";
import PostList from "./PostList";
import Section from "./Section";

interface ComponentProps {
  posts: PostMetadata[];
}

export default function Layout(props: ComponentProps) {
  const description =
    "I'm a software engineer and I make things that run in browsers. Come check out my thoughts on programming and technology.";
  return (
    <div className="Layout">
      <Head>
        <title>Yanglin Zhao</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <div className="Layout-content">
        <Intro />

        <Section title="Blog Posts">
          <PostList posts={props.posts} />
        </Section>
      </div>
      <Footer />
    </div>
  );
}
