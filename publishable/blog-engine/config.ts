import path from "path";

interface GlobalConfig {
  rootPath: string;
  contentPath: string;
}

const projectRoot = process.cwd();

const config: GlobalConfig = {
  rootPath: projectRoot,
  contentPath: path.join(projectRoot, "content"),
};

export default config;
