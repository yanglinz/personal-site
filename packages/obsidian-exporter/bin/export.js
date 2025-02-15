const path = require("node:path");
const fsp = require("node:fs/promises");
const prettier = require("prettier");

async function getAllPosts() {
  const postsPath = path.resolve(process.cwd(), "../www/src/content/posts");
  let postDirs = await fsp.readdir(postsPath, { withFileTypes: true });
  postDirs = postDirs.filter((d) => d.isDirectory());
  return postDirs.map((d) => ({
    slug: d.name,
    path: path.join(d.path, d.name),
  }));
}

async function exportPost(post) {
  // TODO: Convert to markdown
  let content = await fsp.readFile(path.resolve(post.path, "index.mdoc"));

  let formatted = await prettier.format(String(content), {
    parser: "markdown",
    proseWrap: "never",
  });

  let outDir = path.join(process.cwd(), "dist", post.slug);
  try {
    await fsp.mkdir(outDir, { recursive: true });
  } catch (e) {
    // do nothing
  }

  await fsp.writeFile(path.join(outDir, `${post.slug}.md`), formatted);
}

async function exportAll() {
  const posts = await getAllPosts();
  try {
    await fsp.mkdir("./dist");
  } catch (e) {
    // do nothing
  }
  for (let p of posts) {
    await exportPost(p);
  }
}

exportAll();
