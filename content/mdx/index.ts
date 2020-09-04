import * as Mdast from "mdast";
import unified from "unified";
import remark from "remark-parse";

type ToBeTyped = any;
type IncorrectlyTyped = any;

type SvelteASTNodeType =
  | "fragment"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inlineCode"
  | "link"
  | "listOrdered"
  | "listUnordered"
  | "listItem"
  | "paragraph"
  | "text";

interface SvelteASTNode {
  type: SvelteASTNodeType;
  value?: ToBeTyped;
  children?: SvelteASTNode[];
}

export interface SvelteAST {
  type: "root";
  children: SvelteASTNode[];
}

function getMdast(mdString: string): Mdast.Root {
  const processor = unified().use(remark);
  const mdast = processor.parse(mdString);

  const _mdast: any = mdast;
  const _mdastTyped: Mdast.Root = _mdast;
  return _mdastTyped;
}

function mdAstToSvelteAst(node: Mdast.Content): SvelteASTNode {
  if (Array.isArray(node.children)) {
    let children: IncorrectlyTyped = node.children;
    let nodeType: SvelteASTNodeType = "fragment";
    let value = undefined;

    if (node.type === "paragraph") {
      nodeType = "paragraph";
    }

    if (node.type === "heading") {
      if (node.depth === 1) nodeType = "h1";
      if (node.depth === 2) nodeType = "h2";
      if (node.depth === 3) nodeType = "h3";
      if (node.depth === 4) nodeType = "h4";
      if (node.depth === 5) nodeType = "h5";
      if (node.depth === 6) nodeType = "h6";
    }

    if (node.type === "link") {
      nodeType = "link";
      value = {
        url: node.url,
        title: node.title
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

    if (node.type === "inlineCode") {
      nodeType = "inlineCode";
    }

    return {
      type: nodeType,
      value,
      children: children.map(mdAstToSvelteAst)
    };
  }

  let nodeType: SvelteASTNodeType = "fragment";
  let value = node.value;

  if (node.type === "text") {
    nodeType = "text";
  }

  if (node.type === "inlineCode") {
    nodeType = "inlineCode";
  }

  return { type: nodeType, value: value };
}

export async function getSvelteAST(mdxString: string): Promise<SvelteAST> {
  const mdast = getMdast(mdxString);

  return {
    type: "root",
    children: mdast.children.map(mdAstToSvelteAst)
  };
}
