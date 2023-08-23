import type { Node } from "@markdoc/markdoc";

export type Path = string;

export type GlobalConfig = {
  baseDir: Path;
  outputDir: Path;
};

export type FileType = "HTML" | "IMAGE";

export type PostMetadata = {
  type: "POST";
  ast: Node;
};

export type TemplateMetadata = {
  type: "POST";
  ast: Node;
};

export type ImageMetadata = {
  type: "IMAGE";
};

// VirtualFile is an abstraction around a single file that will be
// created in the output directory at the end of the build step.
// It typically will map to html and image files.
// Note that JS and CSS files are generated in a separate pipeline
// (via Vite) and will _not_ be represented as a Virtual file.
export type VirtualFile = {
  type: FileType;
  sourcePath: Path;
  outputPath: Path;
  metadata: PostMetadata | TemplateMetadata | ImageMetadata;
};
