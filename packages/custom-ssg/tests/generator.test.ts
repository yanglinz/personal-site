import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
import { getVirtualFiles } from "../src/content";
import { generateFiles } from "../src/generator";
import * as lfs from "../src/lib/fs";

let tmpDir: string = "";

beforeEach(async () => {
  if (process.env.CI) {
    tmpDir = "/tmp/jest-test";
    await fs.mkdir(tmpDir, { recursive: true });
  } else {
    tmpDir = await fs.mkdtemp(os.tmpdir());
  }
});

afterEach(async () => {
  fs.rm(tmpDir, { recursive: true, force: true });
});

async function getGeneratedFilesSnapshot(dir: string) {
  let output = [];
  for await (const p of lfs.walk(dir)) {
    output.push(p);
  }

  // Normalize the output directory structure
  output = output.map((p) => path.relative(dir, p));
  output = output.sort();
  return output;
}

test("generate basic example files", async () => {
  const exampleDir = path.join(__dirname, "../examples/basic");
  const globalConfig = { baseDir: exampleDir, outputDir: tmpDir };
  const vfs = await getVirtualFiles(globalConfig, exampleDir);
  await generateFiles(globalConfig, vfs);

  const generated = await getGeneratedFilesSnapshot(tmpDir);
  expect(generated).toMatchInlineSnapshot(`
    [
      "index.html",
      "posts/first-post.html",
      "posts/second-post.html",
    ]
  `);
});
