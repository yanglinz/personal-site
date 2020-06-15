const path = require("path");
const fs = require("fs");

const matter = require("gray-matter");

const rootDir = path.join(__dirname, "../../..");
const postsDir = path.join(rootDir, "src/posts");

function parseFrontmatter(slug) {
  return new Promise((resolve, reject) => {
    const postPath = path.join(postsDir, slug, "index.md");
    const postContent = fs.readFileSync(postPath, "utf8");
    const metadata = matter(postContent);
    if (metadata.data) {
      resolve({ ...metadata.data, slug });
    } else {
      reject();
    }
  });
}

export async function getManifest() {
  let posts = await fs.promises.readdir(postsDir, { withFileTypes: true });
  posts = posts.filter(d => d.isDirectory());
  posts = posts.map(p => p.name);
  return await Promise.all(posts.map(parseFrontmatter));
}

export async function hasPost(slug) {
  return fs.existsSync(path.join(postsDir, slug));
}
