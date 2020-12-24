import { h } from "preact";

type TODO = any;

function ContentCodeblock(props: TODO) {
  return <pre dangerouslySetInnerHTML={{ __html: props.html }}></pre>;
}

function ContentTree(node: TODO) {
  let element = node.tagName || "div";
  let attrs = {};

  if (node.children) {
    return h(element, attrs, node.children.map(ContentTree));
  }

  if (node.type === "codeblock") {
    return <ContentCodeblock html={node.value} />;
  }

  if (node.type === "text") {
    return node.value;
  }

  return null;
}

export default function ContentHTML(props: TODO) {
  const { htmlAst } = props;
  return <ContentTree {...htmlAst} />;
}
