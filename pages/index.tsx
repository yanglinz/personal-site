import React from "react";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

type TODO = any;

export async function getStaticProps() {
  const manifest = await import("../publishable/blog-engine/manifest");
  const posts = await manifest.getPostList();
  return { props: { posts } };
}

function Index(props: TODO) {
  const posts: TODO = props.posts;
  return (
    <div>
      <Header />
      <ul>
        {posts.map((p: TODO) => (
          <li>
            <a href={"/posts/" + p.id}>{p.title}</a>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Index;
