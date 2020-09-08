import fs from "fs";
import path from "path";

import { getPostList, getPostDetail } from "../posts/index";
import { getSitemap } from "../posts/sitemap";
import { getImageComponent } from "../images/index";

async function writeFile(filePath: string, content: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
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
  const staticDir = path.resolve(__dirname, "../../static");
  const buildDir = path.resolve(staticDir, "manifest");
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }

  // Write manifest
  const posts = await getPostList();
  const manifestPath = path.resolve(buildDir, "_manifest.json");
  await writeFile(manifestPath, JSON.stringify(posts, null, 2));

  // Write post details
  await Promise.all(
    posts.map(async (post) => {
      const postPath = path.resolve(buildDir, `${post.id}.json`);
      const postDetail = await getPostDetail(post.id);
      return writeFile(postPath, JSON.stringify(postDetail, null, 2));
    })
  );

  // Write sitemap.xml
  const sitemap = await getSitemap();
  const sitemapPath = path.resolve(staticDir, "sitemap.xml");
  await writeFile(sitemapPath, sitemap);

  // Write image manifest component file
  const imageComponent = await getImageComponent();
  const imageComponentPath = path.resolve(
    __dirname,
    "../images/ImageManifest.svelte"
  );
  await writeFile(imageComponentPath, imageComponent);
})();
