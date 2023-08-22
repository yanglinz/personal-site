import type { Node } from "@markdoc/markdoc";

export type Path = string;

export type GlobalConfig = {
  baseDir: Path;
  outputDir: Path;
};

export type ContentType = "POST" | "COMPONENT_TEMPLATE";

export type ContentManifest = {
  type: ContentType;
  sourcePath: Path;
  outputPath: Path;
  ast: Node;
};
