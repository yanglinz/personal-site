import fs from "node:fs/promises";
import path from "node:path";
import { ContentManifest, GlobalConfig } from "./types";
import { getContent } from "./content";

export async function generateFiles(
  config: GlobalConfig,
  manifests: ContentManifest[]
) {
  for (const m of manifests) {
    const content = await getContent(m);
    if (content) {
      const outputPath = path.join(config.outputDir, m.outputPath);
      await fs.writeFile(m.outputPath);
    }
  }
}
