import path from "path";

interface GlobalConfig {
  rootPath: string;
  contentPath: string;
}

const projectRoot = path.join(__dirname, "../../");

const config: GlobalConfig = {
  rootPath: projectRoot,
  contentPath: path.join(projectRoot, "content"),
};

export default config;
