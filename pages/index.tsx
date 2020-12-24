import React from "react";

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
      <h1>Yanglin Zhao</h1>
      <ul>
        {posts.map((p: TODO) => (
          <li>
            <a href={"/posts/" + p.id}>{p.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
