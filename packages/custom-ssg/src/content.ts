import fs from "node:fs/promises";
import path from "node:path";
import Markdoc from "@markdoc/markdoc";
import { Path, GlobalConfig, VirtualFile } from "./types";
import { invariant } from "./lib/invariant";
import * as lfs from "./lib/fs";

async function getPostFiles(
  config: GlobalConfig,
  contentPath: Path
): Promise<VirtualFile[]> {
  const content = `${await fs.readFile(contentPath)}`;

  const sourcePath = path.relative(config.baseDir, contentPath);
  let outputPath: string = "";
  {
    const pathParts = sourcePath.split("/");
    const [fileName, ext] = pathParts[pathParts.length - 1].split(".");
    pathParts[pathParts.length - 1] = `${fileName}.html`;
    outputPath = pathParts.join("/");
  }

  {
    // TODO: Parse the markdown AST and return a list of images
  }

  return [
    {
      type: "HTML",
      sourcePath,
      outputPath,
      metadata: {
        type: "POST",
        ast: Markdoc.parse(content),
      },
    },
  ];
}

async function getFilesFromPath(
  config: GlobalConfig,
  contentPath: Path
): Promise<VirtualFile[]> {
  // TODO: Not all files are posts, handle cases where files are templates
  // based on the simple heuristic of file extension.
  return await getPostFiles(config, contentPath);
}

export async function getVirtualFiles(
  config: GlobalConfig,
  dir: Path
): Promise<VirtualFile[]> {
  invariant(
    path.isAbsolute(dir),
    "getContentManifests expects an absolute directory"
  );

  // Pass in a relative directory so that snapshot tests are stable
  const relativeDir = path.relative(process.cwd(), dir);
  const vfiles = [];
  for await (const p of lfs.walk(relativeDir)) {
    const files = await getFilesFromPath(config, p);
    for (const f of files) {
      vfiles.push(f);
    }
  }

  // Sort the manifest explicitly so that snapshot tests are stable
  return vfiles.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath));
}
