import React from "react";

import {
  ContentScope,
  MarkdownHTML,
} from "../../publishable/blog-engine/components/post";

export default function Page() {
  return (
    <ContentScope postId="hello-blog">
      <MarkdownHTML path="index.md" />
    </ContentScope>
  );
}
