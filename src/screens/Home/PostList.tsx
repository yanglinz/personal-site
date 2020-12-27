import Link from "next/link";

import { PostMetadata } from "../../../publishable/blog-engine/manifest";

interface ComponentProps {
  posts: PostMetadata[];
}

export default function PostList(props: ComponentProps) {
  return (
    <>
      {props.posts.map((post) => (
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
      ))}
    </>
  );
}
