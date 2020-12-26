type TODO = any;

export default function PostList(props: TODO) {
  return props.posts.map((post: TODO) => (
    <div className="Post">
      <h3 className="Post-title">
        <a rel="prefetch" href="posts/{post.slug}">
          {post.title}
        </a>
      </h3>

      <p className="Post-date f-mono">
        <a rel="prefetch" href="posts/{post.slug}">
          {" "}
          <time>{post.date}</time>{" "}
        </a>
      </p>
    </div>
  ));
}
