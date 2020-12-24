import React from "react";

export async function getStaticProps() {
  const manifest = await import("../publishable/blog-engine/manifest");
  const posts = await manifest.getPostList();
  return { props: { posts } };
}

function Index(props) {
  const { posts } = props;
  return (
    <div>
      <h1>Yanglin Zhao</h1>
      <ul>
        {posts.map((p) => (
          <li>
            <a href={"/posts/" + p.id}>{p.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
