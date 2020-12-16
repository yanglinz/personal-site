import unified from "unified";
import remarkParse from "remark-parse";
import mdastToHast from "mdast-util-to-hast";

import { getHighlightMarkup } from "./highlight";

export async function getHast(markdown: string): Promise<any> {
  const processor = unified().use(remarkParse);
  const mdast = processor.parse(markdown);
  return mdastToHast(mdast);
}

function getCodeblockNode(hast: any) {
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
  return {
    type: "codeblock",
    value: markup,
  };
}

function hastToContentAst(hast: any): any {
  const contentAst: any = { type: hast.type };

  const codeblockNode = getCodeblockNode(hast);
  if (codeblockNode) {
    return codeblockNode;
  }

  if (hast.tagName) contentAst.tagName = hast.tagName;
  if (hast.properties) contentAst.properties = hast.properties;
  if (hast.value) contentAst.value = hast.value;
  if (hast.children) contentAst.children = hast.children.map(hastToContentAst);

  return contentAst;
}

export async function getContentAst(markdown: string): Promise<any> {
  const hast = await getHast(markdown);
  return hastToContentAst(hast);
}
