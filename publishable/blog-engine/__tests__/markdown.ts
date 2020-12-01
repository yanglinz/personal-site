import fs from "fs";
import path from "path";

import { getContentAST } from "../markdown";

function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      if (data) {
        resolve(String(data));
      }
    });
  });
}

async function getExample(id: string): Promise<string> {
  const filePath = path.resolve(__dirname, `./fixtures/${id}.mdx`);
  return await readFile(filePath);
}

describe("markdown parser", () => {
  it("should parse headings", async () => {
    const markdown = "# Some heading";
    const ast = await getContentAST(markdown);

    expect(ast).toEqual({
      type: "root",
      children: [
        { type: "h1", children: [{ type: "text", value: "Some heading" }] },
      ],
    });
  });

  it("should parse headings + text", async () => {
    const markdown = "# Some heading\nSome text.";
    const ast = await getContentAST(markdown);

    expect(ast).toEqual({
      type: "root",
      children: [
        { type: "h1", children: [{ type: "text", value: "Some heading" }] },
        {
          type: "paragraph",
          children: [{ type: "text", value: "Some text." }],
        },
      ],
    });
  });
});

describe("markdown parser full examples", () => {
  const exampleIds = ["simple", "simple-nested"];

  exampleIds.forEach((id) => {
    it(`should parse markdown ${id} example`, async () => {
      const markdown = await getExample(id);
      const ast = await getContentAST(markdown);
      expect(ast).toMatchSnapshot();
    });
  });
});

