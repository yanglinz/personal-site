import fs from "node:fs/promises";
import path from "node:path";
import Markdoc from "@markdoc/markdoc";
import { invariant } from "./invariant";
import { Path, GlobalConfig, ContentManifest } from "./types";

export async function getContent(
  manifest: ContentManifest
): Promise<string | undefined> {
  if (manifest.type === "POST") {
    return "";
  }
}

async function getPostManifest(
  config: GlobalConfig,
  contentPath: Path
): Promise<ContentManifest> {
  const content = `${await fs.readFile(contentPath)}`;

  const sourcePath = path.relative(config.baseDir, contentPath);
  let outputPath: string = "";
  {
    const pathParts = sourcePath.split("/");
    const [fileName, ext] = pathParts[pathParts.length - 1].split(".");
    pathParts[pathParts.length - 1] = `${fileName}.html`;
    outputPath = pathParts.join("/")
  }

  return {
    type: "POST",
    sourcePath,
    outputPath,
    ast: Markdoc.parse(content),
  };
}

async function getContentManifest(
  config: GlobalConfig,
  contentPath: Path
): Promise<ContentManifest> {
  return await getPostManifest(config, contentPath);
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
  return manifests.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath));
}
