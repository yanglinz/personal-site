import fs from "node:fs/promises";
import path from "node:path";
import Markdoc from "@markdoc/markdoc";
import { invariant } from "./invariant";
import { Path, GlobalConfig, ContentManifest } from "./types";

async function getContentManifest(
  config: GlobalConfig,
  contentPath: Path
): Promise<ContentManifest> {
  const content = `${await fs.readFile(contentPath)}`;
  const relativePath = path.relative(config.baseDir, contentPath);
  return {
    type: "POST",
    path: relativePath,
    ast: Markdoc.parse(content),
  };
}

async function* walk(dir: Path): AsyncGenerator<string, void, void> {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

export async function getContentManifests(
  config: GlobalConfig,
  dir: Path
): Promise<ContentManifest[]> {
  invariant(
    path.isAbsolute(dir),
    "getContentManifests expects an absolute directory"
  );

  // Pass in a relative directory so that snapshot tests are stable
  const relativeDir = path.relative(process.cwd(), dir);
  const manifests = [];
  for await (const p of walk(relativeDir)) {
    manifests.push(await getContentManifest(config, p));
  }

  // Sort the manifest explicitly so that snapshot tests are stable
  return manifests.sort((a, b) => a.path.localeCompare(b.path));
}
