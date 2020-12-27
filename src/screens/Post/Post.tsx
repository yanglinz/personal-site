import React from "react";
import Link from "next/link";

import { PostMetadata } from "../../../publishable/blog-engine/manifest";

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
          <div className="BlogPost-metadata">
            <h1 className="BlogPost-title">
              <Link href={metadata.urlPath}>
                <a>{metadata.title}</a>
              </Link>
            </h1>

            <time className="BlogPost-date">{metadata.date}</time>
          </div>
        </div>

        <div className="l-narrow">
          <div className="BlogPost-content">{props.children}</div>
        </div>
      </article>
    </main>
  );
}
