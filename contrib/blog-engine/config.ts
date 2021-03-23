import path from "path";

interface GlobalConfig {
  publicUrl: string;
  rootPath: string;
  contentPath: string;
}

const projectRoot = process.cwd();

const config: GlobalConfig = {
  publicUrl: "https://yanglinzhao.com",
  rootPath: projectRoot,
  contentPath: path.join(projectRoot, "content"),
};

export default config;
