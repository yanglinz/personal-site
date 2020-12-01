import * as Mdast from "mdast";
import unified from "unified";
import remark from "remark-parse";

import { getHighlightMarkup } from "./highlight";

type ToBeTyped = any;
type IncorrectlyTyped = any;

type ContentASTNodeType =
  | "blockquote"
  | "code"
  | "emphasis"
  | "fragment"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "html"
  | "inlineCode"
  | "image"
  | "link"
  | "listOrdered"
  | "listUnordered"
  | "listItem"
  | "paragraph"
  | "strong"
  | "text";

interface ContentASTNode {
  type: ContentASTNodeType;
  value?: ToBeTyped;
  children?: ContentASTNode[];
}

export interface ContentAST {
  type: "root";
  children: ContentASTNode[];
}

function getMdast(mdString: string): Mdast.Root {
  const processor = unified().use(remark);
  const mdast = processor.parse(mdString);

  const _mdast: any = mdast;
  const _mdastTyped: Mdast.Root = _mdast;
  return _mdastTyped;
}

function mdAstToContentAst(node: Mdast.Content): ContentASTNode {
  if (Array.isArray(node.children)) {
    let children: IncorrectlyTyped = node.children;
    let nodeType: ContentASTNodeType = "fragment";
    let value = undefined;

    if (node.type === "blockquote") {
      nodeType = "blockquote";
      const listItemChildren: IncorrectlyTyped = node.children;
      if (
        listItemChildren[0].type == "paragraph" &&
        listItemChildren.length === 1
      ) {
        children = node.children[0].children;
      }
    }

    if (node.type === "emphasis") {
      nodeType = "emphasis";
    }

    if (node.type === "heading") {
      if (node.depth === 1) nodeType = "h1";
      if (node.depth === 2) nodeType = "h2";
      if (node.depth === 3) nodeType = "h3";
      if (node.depth === 4) nodeType = "h4";
      if (node.depth === 5) nodeType = "h5";
      if (node.depth === 6) nodeType = "h6";
    }

    if (node.type === "inlineCode") {
      nodeType = "inlineCode";
    }

    if (node.type === "link") {
      nodeType = "link";
      value = {
        url: node.url,
        title: node.title,
      };
    }

    if (node.type === "list") {
      nodeType = node.ordered ? "listOrdered" : "listUnordered";
    }

    if (node.type === "listItem") {
      nodeType = "listItem";
      const listItemChildren: IncorrectlyTyped = node.children;
      if (
        listItemChildren[0].type == "paragraph" &&
        listItemChildren.length === 1
      ) {
        children = node.children[0].children;
      }
    }

    if (node.type === "paragraph") {
      nodeType = "paragraph";
    }

    if (node.type === "strong") {
      nodeType = "strong";
    }

    return {
      type: nodeType,
      value,
      children: children.map(mdAstToContentAst),
    };
  }

  let nodeType: ContentASTNodeType = "fragment";
  let value = node.value;

  if (node.type === "code") {
    nodeType = "code";
    value = {
      lang: node.lang,
      markup: getHighlightMarkup(node.value, node.lang || "text"),
    };
  }

  if (node.type === "html") {
    nodeType = "html";
    value = {
      markup: node.value,
    };
  }

  if (node.type === "inlineCode") {
    nodeType = "inlineCode";
  }

  if (node.type === "image") {
    nodeType = "image";
    value = {
      alt: node.alt,
      title: node.title,
      url: node.url,
    };
  }

  if (node.type === "text") {
    nodeType = "text";
  }

  return { type: nodeType, value: value };
}

export async function getContentAST(mdxString: string): Promise<ContentAST> {
  const mdast = getMdast(mdxString);

  return {
    type: "root",
    children: mdast.children.map(mdAstToContentAst),
  };
}

export function walkContentAST(
  ast: ContentAST | ContentASTNode,
  transformer: (n: ContentAST | ContentASTNode) => void
) {
  if (Array.isArray(ast.children)) {
    ast.children.forEach((a) => walkContentAST(a, transformer));
  }

  transformer(ast);
}
