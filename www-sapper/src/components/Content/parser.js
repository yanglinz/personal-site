export const NodeTypes = {
  FRAGMENT: "FRAGMENT",
  P: "P",
  H1: "H1",
  H2: "H2",
  H3: "H3",
  H4: "H4",
  H5: "H5",
  H6: "H6",
  LINK: "LINK",
  IMAGE: "IMAGE"
};

function parsePortableTextNodeType(portableTextNode) {
  if (portableTextNode._type === "block") {
    if (portableTextNode.style === "h1") {
      return NodeTypes.H1;
    }

    return NodeTypes.P;
  }

  if (portableTextNode._type === "mainImage") {
    return NodeTypes.IMAGE;
  }

  return NodeTypes.FRAGMENT;
}

function parsePortableTextNodeAttrs(portableTextNode) {
  let nodeType = parsePortableTextNodeType(portableTextNode);

  let attrs = {};
  if (nodeType === NodeTypes.FRAGMENT) {
    attrs.text = portableTextNode.text;
  }

  if (portableTextNode.marks && portableTextNode.marks.length > 0) {
    nodeType = NodeTypes.LINK;
    attrs.href = "http://google.com";
  }

  if (nodeType === NodeTypes.IMAGE) {
    attrs.alt = portableTextNode.alt;
    attrs.asset = portableTextNode.asset;
    attrs.caption = portableTextNode.caption;
  }

  return { type: nodeType, ...attrs };
}

export function parsePortableText(portableTextNode) {
  if (Array.isArray(portableTextNode)) {
    return portableTextNode.map(parsePortableText);
  }

  if (portableTextNode.children) {
    return {
      ...parsePortableTextNodeAttrs(portableTextNode),
      children: parsePortableText(portableTextNode.children)
    };
  }

  return parsePortableTextNodeAttrs(portableTextNode);
}
