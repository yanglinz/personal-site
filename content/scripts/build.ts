import fs from "fs";
import path from "path";

import { getPostList, getPostDetail } from "../src/posts/index";

async function writeFile(filePath: string, content: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

(async () => {
  // Create build directory
  const buildDir = path.resolve(__dirname, "../build");
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

  // Write manifest
  const posts = await getPostList();
  const manifestPath = path.resolve(buildDir, "_manifest.json");
  await writeFile(manifestPath, JSON.stringify(posts, null, 2));

  // Write post details
  await Promise.all(
    posts.map(async post => {
      const postPath = path.resolve(buildDir, `${post.id}.json`);
      const postDetail = await getPostDetail(post.id);
      return writeFile(postPath, JSON.stringify(postDetail, null, 2));
    })
  );
})();
