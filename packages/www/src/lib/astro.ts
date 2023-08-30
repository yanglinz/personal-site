import fs from "node:fs/promises";
import path from "node:path";
import * as url from "node:url";

async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Helper to get the root path of the Astro project
async function getRootPath() {
  async function isRootPath(searchPath: string) {
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
}

export async function getGlobalConfig() {
  return {
    rootPath: await getRootPath(),
  };
}
