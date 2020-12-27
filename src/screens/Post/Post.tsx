import React from "react";

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
              <a rel="prefetch" href="posts/{post.slug}">
                {metadata.title}
              </a>
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
