import * as mdx from "../index";

describe("mdx parser", () => {
  it("should parse simple markdown", async () => {
    const mdxString = "# Hello world!";
    const ast = await mdx.getSvelteAST(mdxString);

    expect(ast).toEqual({
      type: "root",
      children: [
        { type: "h1", children: [{ type: "text", value: "Hello world!" }] }
      ]
    });
  });
});
