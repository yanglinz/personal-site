import React from "react";
import Link from "next/link";
import { PostMetadata } from "@blog-engine/manifest";

interface ComponentProps {
  metadata: PostMetadata;
  children: React.ReactNode;
}

export default function Post(props: ComponentProps) {
  const { metadata } = props;
  // TODO: Featured image
  return (
    <main>
      <article className="BlogPost">
        <div className="l-wide">
          <div className="py-8">
            <h1 className="m-0 text-center text-4xl font-bold leading-tight">
              <Link href={metadata.urlPath}>
                <a>{metadata.title}</a>
              </Link>
            </h1>

            <p className="pt-1 text-center text-gray-400 font-mono text-sm">
              <time>{metadata.date}</time>
            </p>
          </div>
        </div>

        <div className="l-narrow">
          <div className="BlogPost-content">{props.children}</div>
        </div>
      </article>
    </main>
  );
}
