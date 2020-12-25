import React from "react";

import Layout from "./_layout";

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
      <ul>
        {posts.map((p: TODO) => (
          <li>
            <a href={"/posts/" + p.id}>{p.title}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default Index;
