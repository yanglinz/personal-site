export const NodeTypes = {
  FRAGMENT: "FRAGMENT",
  FRAGMENT_EM: "FRAGMENT_EM",
  P: "P",
  H1: "H1",
  H2: "H2",
  H3: "H3",
  H4: "H4",
  H5: "H5",
  H6: "H6",
  LINK: "LINK",
  IMAGE: "IMAGE",
  CODE: "CODE"
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

  if (portableTextNode._type === "code") {
    return NodeTypes.CODE;
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
    if (portableTextNode.marks[0] == "em") {
      nodeType = NodeTypes.FRAGMENT_EM;
    } else {
      nodeType = NodeTypes.LINK;
      attrs.href = "http://google.com";
    }
  }

  if (nodeType === NodeTypes.IMAGE) {
    attrs.alt = portableTextNode.alt;
    attrs.caption = portableTextNode.caption;
    attrs.metadata = portableTextNode.metadata;
  }

  if (nodeType === NodeTypes.CODE) {
    attrs.language = portableTextNode.language;
    attrs.markup = portableTextNode.markup;
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
