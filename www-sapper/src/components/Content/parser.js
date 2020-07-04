export const NodeTypes = {
  BLOCKQUOTE: "BLOCKQUOTE",
  FRAGMENT: "FRAGMENT",
  FRAGMENT_EM: "FRAGMENT_EM",
  FRAGMENT_CODE: "FRAGMENT_CODE",
  P: "P",
  H1: "H1",
  H2: "H2",
  H3: "H3",
  H4: "H4",
  H5: "H5",
  H6: "H6",
  LINK: "LINK",
  LIST_ORDERED: "LIST_ORDERED",
  LIST_UNORDERED: "LIST_UNORDERED",
  LIST_ITEM: "LIST_ITEM",
  IMAGE: "IMAGE",
  CODE: "CODE"
};

function parsePortableTextNodeType(portableTextNode) {
  if (portableTextNode.customType === "bullet") {
    return NodeTypes.LIST_UNORDERED;
  }

  if (portableTextNode.customType === "number") {
    return NodeTypes.LIST_ORDERED;
  }

  if (portableTextNode._type === "block") {
    if (portableTextNode.style === "h1") {
      return NodeTypes.H1;
    }

    if (portableTextNode.style === "blockquote") {
      return NodeTypes.BLOCKQUOTE;
    }

    if (portableTextNode.listItem) {
      return NodeTypes.LIST_ITEM;
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

function parsePortableTextNodeAttrs(portableTextNode, markDefs) {
  let nodeType = parsePortableTextNodeType(portableTextNode);

  let attrs = {};
  if (nodeType === NodeTypes.FRAGMENT) {
    attrs.text = portableTextNode.text;
  }

  if (portableTextNode.marks && portableTextNode.marks.length > 0) {
    if (portableTextNode.marks[0] == "em") {
      nodeType = NodeTypes.FRAGMENT_EM;
    } else if (portableTextNode.marks[0] == "code") {
      nodeType = NodeTypes.FRAGMENT_CODE;
    } else {
      const markId = portableTextNode.marks[0];
      const linkAttrs = markDefs[markId];
      nodeType = NodeTypes.LINK;
      attrs.href = linkAttrs.href;
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

function walkNodes(nodes, cb) {
  if (Array.isArray(nodes)) {
    return nodes.forEach(n => {
      walkNodes(n, cb);
    });
  }

  if (nodes.children) {
    nodes.children.forEach(n => {
      walkNodes(n, cb);
    });
  }

  cb(nodes);
}

export function getAllMarks(portableTextNode) {
  let marks = {};
  walkNodes(portableTextNode, n => {
    if (n.markDefs) {
      n.markDefs.forEach(d => {
        marks[d._key] = d;
      });
    }
  });
  return marks;
}

export function nestLists(portableTextNode) {
  if (!Array.isArray(portableTextNode)) {
    return portableTextNode;
  }

  let grouped = [];
  let currentListGroup;
  portableTextNode.forEach(node => {
    if (node.listItem) {
      if (currentListGroup) {
        // Append to the existing group
        currentListGroup.children.push(node);
      } else {
        // Start a new group
        currentListGroup = {
          _type: "block",
          customType: node.listItem,
          children: [node]
        };
      }
    } else {
      if (currentListGroup) {
        // Reset the group
        grouped.push(currentListGroup);
        currentListGroup = undefined;
      }
      grouped.push(node);
    }
  });

  return grouped;
}

export function parsePortableText(portableTextNode, markDefs) {
  if (Array.isArray(portableTextNode)) {
    return portableTextNode.map(n => parsePortableText(n, markDefs));
  }

  if (portableTextNode.children) {
    return {
      ...parsePortableTextNodeAttrs(portableTextNode, markDefs),
      children: parsePortableText(portableTextNode.children, markDefs)
    };
  }

  return parsePortableTextNodeAttrs(portableTextNode, markDefs);
}
