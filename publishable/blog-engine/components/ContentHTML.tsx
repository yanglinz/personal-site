import { h } from "preact";
import Image from "next/image";

type TODO = any;

function ContentCodeblock(props: TODO) {
  return <pre dangerouslySetInnerHTML={{ __html: props.html }}></pre>;
}

function ContentImage(props: TODO) {
  const { content, node } = props;
  const { path, alt } = node.properties;
  const imageMetadata = content.images[path];
  if (!imageMetadata) {
    return null;
  }

  return (
    <Image
      src={path}
      alt={alt}
      width={imageMetadata.width}
      height={imageMetadata.height}
      layout="responsive"
    />
  );
}

function ContentLiteral(props: TODO) {
  return <div dangerouslySetInnerHTML={{ __html: props.node.value }}></div>;
}

function ContentTree(props: TODO) {
  const { node, content } = props;
  let element = node.tagName || "div";
  let attrs = {};

  if (node.children) {
    return h(
      element,
      attrs,
      node.children.map((c: TODO) => <ContentTree content={content} node={c} />)
    );
  }

  if (node.type === "codeblock") {
    return <ContentCodeblock html={node.value} />;
  }

  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "img") {
    return <ContentImage content={content} node={node} />;
  }

  if (node.type === "html") {
    return <ContentLiteral content={content} node={node} />;
  }

  return null;
}

export default function ContentHTML(props: TODO) {
  const { content } = props;
  return <ContentTree content={content} node={content.ast} />;
}
