import fs from "node:fs/promises";
import path from "node:path";
import { Path, ContentManifest } from "./types";

async function* walk(directory: Path): AsyncGenerator<string, void, void> {
  for await (const d of await fs.opendir(directory)) {
    const entry = path.join(directory, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

export async function getContentManifests(
  inputDirectory: Path,
): Promise<ContentManifest[]> {
  for await (const p of walk(inputDirectory)) {
    console.log(p);
  }

  return [];
}
