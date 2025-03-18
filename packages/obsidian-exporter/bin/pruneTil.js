const path = require("node:path");
const fsp = require("node:fs/promises");
const { parseFrontmatter } = require('@astrojs/markdown-remark');

async function getEntries() {
  const entriesPath = path.resolve(process.cwd(), "../www/src/content/til");
  let entries = await fsp.readdir(entriesPath, { withFileTypes: true });
  entries = entries.filter((p) => p.isFile());
  return entries.map(e => path.join(e.path, e.name));
}

async function getEntry(entryPath) {
  let content = `${await fsp.readFile(entryPath)}`;
  return parseFrontmatter(content);
}

async function prune() {
  const entries = await getEntries();
  for (let e of entries) {
    if (e.includes('Copy')) {
      debugger;
    }
    const entry = await getEntry(e);
    // Every til should contain a frontmatter with at least the title
    if (!entry.frontmatter.title) {
      await fsp.unlink(e);
    }
  }
}

prune();
