import { h } from "preact";

function ContentTree(node) {
  let element = node.tagName || "div";
  let attrs = {};

  if (node.children) {
    return h(element, attrs, node.children.map(ContentTree));
  }

  if (node.type === "text") {
    return node.value;
  }

  return null;
}

export default function ContentHTML(props) {
  const { htmlAst } = props;
  return <ContentTree {...htmlAst} />;
}
