import fs from "node:fs/promises";
import path from "node:path";
import * as url from "node:url";
import { type CollectionEntry } from "astro:content";

async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function getId(entry: any): string {
  let entryId = (entry as any).slug || entry.id;
  if (!entryId) {
    throw new Error(`Expected 'slug' to be a property for entry ${entry.id}`);
  }
  return entryId;
}

// Helper to get the root path of the Astro project
async function getRootPath(): Promise<string> {
  async function isRootPath(searchPath: string): Promise<boolean> {
    // Make sure path is a directory
    try {
      const stats = await fs.lstat(searchPath);
      if (!stats.isDirectory()) return false;
    } catch (_) {
      return false;
    }

    return await exists(path.join(searchPath, "astro.config.mjs"));
  }

  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const parts = __dirname.split("/");
  for (let i = parts.length - 1; i >= 0; i--) {
    const searchPath = parts.slice(0, i).join("/");
    if (await isRootPath(searchPath)) {
      return searchPath;
    }
  }

  throw new Error('Failed to determine root path');
}

export async function getGlobalConfig() {
  return {
    rootPath: await getRootPath(),
  };
}
