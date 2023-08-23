import fs from "node:fs/promises";
import path from "node:path";

/**
 * Recursively walk a directory and yield a list of files
 */
export async function* walk(dir: string): AsyncGenerator<string, void, void> {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}
