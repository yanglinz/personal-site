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

async function* walk(dir: string): AsyncGenerator<string, void, void> {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

test("generate basic example files", async () => {
  const exampleDir = path.join(__dirname, "../examples/basic");
  const globalConfig = { baseDir: exampleDir, outputDir: tmpDir };
  const manifests = await getContentManifests(globalConfig, exampleDir);
  await generateFiles(globalConfig, manifests);
});
