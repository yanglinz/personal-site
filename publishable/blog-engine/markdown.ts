import unified from "unified";
import remarkParse from "remark-parse";
import mdastToHast from "mdast-util-to-hast";

export async function getHast(markdown: string): Promise<any> {
  const processor = unified().use(remarkParse);
  const mdast = processor.parse(markdown);
  return mdastToHast(mdast);
}
