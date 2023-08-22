import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
import { getContentManifests } from "../src/content";
import { generateFiles } from "../src/generator";

let tmpDir: string = "";

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(os.tmpdir());
});

afterEach(async () => {
  fs.rmdir(tmpDir);
});

async function getGeneratedFilesSnapshot(dir: string) {
  async function* walk(dir: string): AsyncGenerator<string, void, void> {
    for await (const d of await fs.opendir(dir)) {
      const entry = path.join(dir, d.name);
      if (d.isDirectory()) yield* walk(entry);
      else if (d.isFile()) yield entry;
    }
  }

  let output = [];
  for await (const p of walk(dir)) {
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
  const manifests = await getContentManifests(globalConfig, exampleDir);
  await generateFiles(globalConfig, manifests);

  const generated = await getGeneratedFilesSnapshot(tmpDir);
  expect(generated).toMatchInlineSnapshot();
});
