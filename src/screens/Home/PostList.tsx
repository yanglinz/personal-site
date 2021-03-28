import Link from "next/link";
import Image from "next/image";
import { PostMetadata } from "@blog-engine/manifest";

import styles from "./PostList.module.css";

interface PostListProps {
  posts: PostMetadata[];
}

interface PostThumbnailProps {
  post: PostMetadata;
}

function PostThumbnail(props: PostThumbnailProps) {
  const { post } = props;
  const width = 50;
  const height = 50;
  return (
    <div
      className={styles.postThumbnail}
      style={{ width: width, height: height }}
    >
      {post.thumbnailImage ? (
        <Image
          src={post.thumbnailImage}
          alt={`Thumbnail for ${post.title}`}
          layout="intrinsic"
          width={width}
          height={height}
        />
      ) : null}
    </div>
  );
}

export default function PostList(props: PostListProps) {
  return (
    <>
      {props.posts.map((post) => (
        <div className={styles.post}>
          <PostThumbnail post={post} />

          <h3 className={styles.postTitle}>
            <Link href={post.urlPath}>
              <a>{post.title}</a>
            </Link>
          </h3>

          <p className={styles.postDate + " " + "f-mono"}>
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
