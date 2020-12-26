import Link from "next/link";

type TODO = any;

export default function PostList(props: TODO) {
  return props.posts.map((post: TODO) => (
    <div className="Post">
      <h3 className="Post-title">
        <Link href={post.urlPath}>
          <a>{post.title}</a>
        </Link>
      </h3>

      <p className="Post-date f-mono">
        <Link href={post.urlPath}>
          <a>
            <time>{post.date}</time>{" "}
          </a>
        </Link>
      </p>
    </div>
  ));
}
