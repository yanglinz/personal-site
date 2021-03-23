import unified from "unified";
import remarkParse from "remark-parse";
import mdastToHast from "mdast-util-to-hast";

import { getHighlightMarkup } from "./highlight";

type TODO = any;

function customMdastToHast(node: TODO) {
  if (node.type === "html") {
    return node;
  }

  return mdastToHast(node);
}

export async function getHast(markdown: string): Promise<any> {
  const processor = unified().use(remarkParse);
  const mdast: TODO = processor.parse(markdown);
  const hast = {
    type: "root",
    children: mdast.children
      .map((m: TODO) => customMdastToHast(m))
      .filter(Boolean),
    position: mdast.position,
  };
  return hast;
}

function getCodeblockNode(postId: string, hast: TODO): TODO {
  let isCodeblock =
    hast.tagName === "code" &&
    hast.properties.className &&
    hast.properties.className[0] &&
    hast.properties.className[0].includes("language-");
  isCodeblock = Boolean(isCodeblock);

  if (!isCodeblock) {
    return null;
  }

  const source = hast.children[0].value;
  const language = hast.properties.className[0].replace("language-", "");
  const markup = getHighlightMarkup(source, language);
  return { type: "codeblock", value: markup };
}

function getImageNode(postId: string, hast: TODO): TODO {
  let isImage = hast.tagName === "img";
  if (!isImage) {
    return null;
  }

  const { src, alt } = hast.properties;
  const filePath = src.replace("./", "");
  const imagePath = `/content/${postId}/${filePath}`;

  const properties = { path: imagePath, alt };
  return { type: "img", properties };
}

function hastToContentAst(postId: string, hast: TODO): TODO {
  const contentAst: TODO = { type: hast.type };

  const codeblockNode = getCodeblockNode(postId, hast);
  if (codeblockNode) {
    return codeblockNode;
  }

  const imageNode = getImageNode(postId, hast);
  if (imageNode) {
    return imageNode;
  }

  if (hast.tagName) contentAst.tagName = hast.tagName;
  if (hast.properties) contentAst.properties = hast.properties;
  if (hast.value) contentAst.value = hast.value;
  if (hast.children)
    contentAst.children = hast.children.map((c: TODO) =>
      hastToContentAst(postId, c)
    );

  return contentAst;
}

export async function getContentAst(
  postId: string,
  markdown: string
): Promise<TODO> {
  const hast = await getHast(markdown);
  return hastToContentAst(postId, hast);
}
