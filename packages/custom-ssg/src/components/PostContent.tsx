import type { Node } from "@markdoc/markdoc";

type PostContentProps = {
  ast: Node;
};

export function PostContent(props: PostContentProps) {
  return (
    <div>
      <h1>Markdown placeholder</h1>
    </div>
  );
}
