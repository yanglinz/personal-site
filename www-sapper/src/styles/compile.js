const fs = require("fs");
const path = require("path");

function walkDirSync(basePath, cb) {
  const files = fs.readdirSync(basePath, { withFileTypes: true });
  files.forEach(f => {
    if (f.isDirectory()) {
      walkDirSync(path.join(basePath, f.name), cb);
    } else {
      const file = {
        dirent: f,
        pathAbs: path.join(basePath, f.name)
      };
      cb(file);
    }
  });
}

function getAllFiles(basePath) {
  const files = [];
  walkDirSync(basePath, f => {
    files.push(f);
  });

  return files;
}

function getSassFilePaths(files) {
  const importBase = __dirname;
  const sassPaths = files
    .filter(f => f.pathAbs.endsWith(".scss"))
    .map(f => f.pathAbs)
    .map(p => path.relative(importBase, p))
    .filter(f => f !== "index.scss")
    .sort()
    .reverse();
  return sassPaths;
}

function getManifest(sassPaths) {
  const statements = sassPaths.map(p => `@import "${p}";`);
  return statements.join("\n") + "\n";
}

function writeManifest(content) {
  const manifestPath = path.join(__dirname, "index.scss");
  fs.writeFileSync(manifestPath, content);
}

const searchDir = path.join(__dirname, "..");
const files = getAllFiles(searchDir);
const sassFiles = getSassFilePaths(files);
const manifest = getManifest(sassFiles);
writeManifest(manifest);
