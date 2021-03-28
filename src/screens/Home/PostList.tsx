import Link from "next/link";
import Image from "next/image";
import { PostMetadata } from "@blog-engine/manifest";

import styles from "./PostList.module.css";

interface ComponentProps {
  posts: PostMetadata[];
}

export default function PostList(props: ComponentProps) {
  return (
    <>
      {props.posts.map((post) => (
        <div className={styles.post}>
          <h3 className="Post-title">
            <Link href={post.urlPath}>
              <a>{post.title}</a>
            </Link>
          </h3>

          {post.thumbnailImage ? (
            <Image
              src={post.thumbnailImage}
              alt={`Thumbnail for ${post.title}`}
              layout="intrinsic"
              width={100}
              height={100}
            />
          ) : (
            <div style={{ width: 100, height: 100 }} />
          )}

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
