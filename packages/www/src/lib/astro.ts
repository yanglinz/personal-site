import fsp from "node:fs/promises";
import fs from 'node:fs';
import path from "node:path";
import * as url from "node:url";

async function exists(filePath: string) {
  try {
    await fsp.access(filePath);
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
      const stats = await fsp.lstat(searchPath);
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

const GLOBAL_CONFIG_TMP_PATH = "/tmp/astro-global-config.json";

// There are cases like custom markdoc functions where we need the
// global configuration synchronously. To support a synchronous 
// getGlobalConfig we'll generate the global config in an astro integration 
// to a known absolute path and read its data synchronously.
export function globalConfigIntegration() {
  return {
    name: "global-config-integration",
    hooks: {
      'astro:config:setup': async () => {
        const config = await _getGlobalConfig();
        await fsp.writeFile(GLOBAL_CONFIG_TMP_PATH, JSON.stringify(config));
      }
    }
  }
}

async function _getGlobalConfig() {
  return {
    rootPath: await getRootPath(),
  };
}

export function getGlobalConfig() {
  const config = `${fs.readFileSync(GLOBAL_CONFIG_TMP_PATH)}`;
  return JSON.parse(config);
}
