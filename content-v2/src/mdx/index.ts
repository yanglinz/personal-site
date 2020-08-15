import * as Mdast from "mdast";
import unified from "unified";
import remark from "remark-parse";

type ToBeTyped = any;

type SvelteASTNodeType =
  | "fragment"
  | "text"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

interface SvelteASTNode {
  type: SvelteASTNodeType;
  value?: ToBeTyped;
  children?: SvelteASTNode[];
}

interface SvelteAST {
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
    let nodeType: SvelteASTNodeType = "fragment";
    if (node.type === "heading") {
      if (node.depth === 1) nodeType = "h1";
      if (node.depth === 2) nodeType = "h2";
      if (node.depth === 3) nodeType = "h3";
      if (node.depth === 4) nodeType = "h4";
      if (node.depth === 5) nodeType = "h5";
      if (node.depth === 6) nodeType = "h6";
    }

    return {
      type: nodeType,
      children: node.children.map(mdAstToSvelteAst)
    };
  }

  let nodeType: SvelteASTNodeType = "fragment";
  if (node.type === "text") {
    nodeType = "text";
  }

  return {
    type: nodeType,
    value: node.value
  };
}

export async function getSvelteAST(mdxString: string): Promise<SvelteAST> {
  const mdast = getMdast(mdxString);

  return {
    type: "root",
    children: mdast.children.map(mdAstToSvelteAst)
  };
}

async function transpile(content: ToBeTyped): Promise<ToBeTyped> {
  const processor = unified().use(remark);

  // const htmlProcessor = unified().use(rehype);
  // parsed = htmlProcessor.parse("<html />");
  return processor.parse(content);
}
