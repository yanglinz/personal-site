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

// There are cases like custom markdoc functions where we need the
// global configuration synchronously. To support a synchronous getGlobalConfig
// we'll generate the global config in a astro integration to a known absolute path
// and read its data synchronously.
export function globalConfigIntegration() {
  return {
    name: "global-config-integration",
    hooks: {
      'astro:config:setup': async () => {
        console.log('astro:config:setup');
      }
    }
  }
}

function getGlobalConfigCachedPath() {
  return '/tmp/astro-global-config.json';
}

export async function getGlobalConfig() {
  return {
    rootPath: await getRootPath(),
  };
}

// need a sync version of the function
