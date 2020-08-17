import fs from "fs";
import path from "path";

import * as mdx from "../index";

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

describe("mdx parser examples", () => {
  const exampleIds = ["simple", "simple-nested"];

  exampleIds.forEach(id => {
    it(`should parse markdown ${id} example`, async () => {
      const mdxString = await getExample(id);
      const ast = await mdx.getSvelteAST(mdxString);
      expect(ast).toMatchSnapshot();
    });
  });
});
