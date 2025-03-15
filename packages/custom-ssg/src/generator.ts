import fs from "node:fs/promises";
import path from "node:path";
import Preact from "preact";
import render from "preact-render-to-string";
import { GlobalConfig, VirtualFile } from "./types";
import { PostContent } from "./components/PostContent";

export async function getFileContent(
  vf: VirtualFile,
): Promise<string | undefined> {
  if (vf.metadata.type === "POST") {
    return render(Preact.h(PostContent, { ast: vf.metadata.ast }, null) as any);
  }
}

export async function generateFiles(
  config: GlobalConfig,
  vfiles: VirtualFile[],
) {
  for (const f of vfiles) {
    const content = await getFileContent(f);
    if (content) {
      const outputPath = path.join(config.outputDir, f.outputPath);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, content);
    }
  }
}
