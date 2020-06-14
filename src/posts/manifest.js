const path = require("path");
const fs = require("fs");

const vfile = require("to-vfile");
const unified = require("unified");
const remarkParse = require("remark-parse");
const remarkHtml = require("remark-html");
const remarkHighlight = require("remark-highlight.js");
const remarkFrontmatter = require("remark-frontmatter");
const remarkFrontmatterExtract = require("remark-extract-frontmatter");
const yaml = require("yaml").parse;

const posts = [
  {
    title: "What is Sapper?",
    slug: "what-is-sapper",
    html: `Hello world!`
  },
  {
    title: "How to use Sapper",
    slug: "how-to-use-sapper",
    html: `Hello world!`
  },
  {
    title: "Why the name?",
    slug: "why-the-name",
    html: `Hello world!`
  }
];

const postsBySlug = {};
posts.forEach(p => {
  postsBySlug[p.slug] = p;
});

const rootDir = path.join(__dirname, "../../..");
const postsDir = path.join(rootDir, "src/posts");

function parseMarkdown(path) {
  return new Promise((resolve, reject) => {
    unified()
      .use(remarkParse)
      .use(remarkHtml)
      .use(remarkHighlight)
      .use(remarkFrontmatter)
      .use(remarkFrontmatterExtract, { yaml })
      .process(vfile.readSync(path), (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
  });
}

export async function getManifest() {
  let posts = await fs.promises.readdir(postsDir, { withFileTypes: true });
  posts = posts.filter(d => d.isDirectory());
  posts = posts.map(p => path.join(postsDir, p.name, "index.md"));

  const parsedPosts = await Promise.all(posts.map(parseMarkdown));

  return posts;
}

export function hasPost(slug) {
  return Boolean(postsBySlug[slug]);
}

export function getPost(slug) {
  return postsBySlug[slug];
}
