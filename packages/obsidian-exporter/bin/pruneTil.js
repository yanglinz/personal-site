const path = require("node:path");
const fsp = require("node:fs/promises");
const { parseFrontmatter } = require("@astrojs/markdown-remark");

async function getEntries() {
  const entriesPath = path.resolve(process.cwd(), "../www/src/content/til");
  let entries = await fsp.readdir(entriesPath, { withFileTypes: true });
  return entries.filter((p) => p.isFile());
}

async function getEntry(entryPath) {
  let content = `${await fsp.readFile(entryPath)}`;
  return parseFrontmatter(content);
}

async function prune() {
  const entries = await getEntries();
  for (let e of entries) {
    let entryPath = path.join(e.path, e.name);
    const entry = await getEntry(entryPath);
    if (!entry.frontmatter.title) {
      // Delete the entry if it doesn't contain a valid entry matter
      await fsp.unlink(entryPath);
    } else {
      // Slugify the file name
      let fileName = e.name;
      let newFilename = e.name.replaceAll(" ", "-").toLowerCase();
      let newPath = path.join(e.parentPath, newFilename);
      await fsp.rename(entryPath, newPath);
    }
  }
}

prune();
