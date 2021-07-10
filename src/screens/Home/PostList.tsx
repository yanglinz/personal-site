import Link from "next/link";
import Image from "next/image";
import { PostMetadata } from "@blog-engine/manifest";

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
    <div style={{ width: width, height: height }}>
      {post.thumbnailImage ? (
        <Image
          className="rounded-full shadow"
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
        <div className="border-gray-150 flex items-center justify-between py-3 border-t lg:py-4">
          <div className="flex-initial">
            <PostThumbnail post={post} />
          </div>

          <h3 className="flex-1 px-5">
            <Link href={post.urlPath}>
              <a className="text-xl font-bold lg:text-3xl">{post.title}</a>
            </Link>
          </h3>

          <p className="flex-initial">
            <Link href={post.urlPath}>
              <a className="text-gray-400 font-mono text-sm">
                <time>{post.date}</time>{" "}
              </a>
            </Link>
          </p>
        </div>
      ))}
    </>
  );
}
