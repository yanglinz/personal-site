const path = require("path");
const fs = require("fs");

const rootDir = path.join(__dirname, "../../..");
const postsDir = path.join(rootDir, "src/posts");

function parseMarkdown(slug) {
  const postPath = path.join(postsDir, slug, "index.md");
  return new Promise((resolve, reject) => {
    unified()
      .use(remarkParse)
      .use(remarkHtml)
      .use(remarkHighlight)
      .use(remarkFrontmatter)
      .use(remarkFrontmatterExtract, { yaml })
      .process(vfile.readSync(postPath), (err, file) => {
        if (err) {
          reject(err);
        } else {
          const postData = {
            ...file.data,
            slug,
            html: file.contents
          };
          resolve(postData);
        }
      });
  });
}

function parseMarkdownFrontmatter(slug) {
  const postPath = path.join(postsDir, slug, "index.md");
  return new Promise((resolve, reject) => {
    unified()
      .use(remarkParse)
      .use(remarkHtml)
      .use(remarkFrontmatter)
      .use(remarkFrontmatterExtract, { yaml })
      .process(vfile.readSync(postPath), (err, file) => {
        if (err) {
          reject(err);
        } else {
          const postData = { ...file.data, slug };
          resolve(postData);
        }
      });
  });
}

export async function getManifest() {
  let posts = await fs.promises.readdir(postsDir, { withFileTypes: true });
  posts = posts.filter(d => d.isDirectory());
  posts = posts.map(p => p.name);
  return await Promise.all(posts.map(parseMarkdownFrontmatter));
}

export async function hasPost(slug) {
  return fs.existsSync(path.join(postsDir, slug));
}

export async function getPost(slug) {
  return await parseMarkdown(slug);
}
