export type Path = string;

export type GlobalConfig = {
  baseDir: Path;
};

export type ContentType = "POST" | "COMPONENT_TEMPLATE";

export type ContentManifest = {
  type: ContentType;
  path: Path;
  pathSegments: Path[];
};
