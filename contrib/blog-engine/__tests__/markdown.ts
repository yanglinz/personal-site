import path from "path";

import { getFileContent } from "../helpers/fs";
import { getHast } from "../markdown";

async function getExample(id: string): Promise<string> {
  const filePath = path.resolve(__dirname, `./fixtures/${id}.mdx`);
  return await getFileContent(filePath);
}

describe("markdown to html ast parser", () => {
  it("should parse headings", async () => {
    const markdown = "# Some heading";
    const ast = await getHast(markdown);
    expect(ast).toMatchSnapshot();
  });

  it("should parse headings + text", async () => {
    const markdown = "# Some heading\nSome text.";
    const ast = await getHast(markdown);
    expect(ast).toMatchSnapshot();
  });
});

describe("markdown to html ast parser full examples", () => {
  const exampleIds = ["simple", "simple-nested", "with-codeblock"];

  exampleIds.forEach((id) => {
    it(`should parse markdown ${id} example`, async () => {
      const markdown = await getExample(id);
      const ast = await getHast(markdown);
      expect(ast).toMatchSnapshot();
    });
  });
});
