import * as mdx from "../index";

describe("mdx parser", () => {
  it("should parse headings", async () => {
    const mdxString = "# Some heading";
    const ast = await mdx.getSvelteAST(mdxString);

    expect(ast).toEqual({
      type: "root",
      children: [
        { type: "h1", children: [{ type: "text", value: "Some heading" }] }
      ]
    });
  });

  it("should parse headings + text", async () => {
    const mdxString = "# Some heading\nSome text.";
    const ast = await mdx.getSvelteAST(mdxString);

    expect(ast).toEqual({
      type: "root",
      children: [
        { type: "h1", children: [{ type: "text", value: "Some heading" }] },
        { type: "paragraph", children: [{ type: "text", value: "Some text." }] }
      ]
    });
  });
});
