import fs from "fs";
import path from "path";

import { SvelteAST } from "../mdx";
import { getSvelteAST } from "../mdx";

interface Post {
  id: string;
  title: string;
  date: string;
}

interface PostMetadata {
  title: string;
  date: string;
}

interface PostDetail {
  id: string;
  title: string;
  date: string;
  body: SvelteAST;
}

function getFileContent(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(String(data));
      }
    });
  });
}

export async function getPostList(): Promise<Post[]> {
  const files = fs.readdirSync(__dirname, { withFileTypes: true });
  const postDirectories = files
    .filter(f => f.isDirectory())
    .map(async f => {
      const postId = f.name;
      const metadata = await getPostMetadata(postId);
      return { id: postId, title: metadata.title, date: metadata.date };
    });
  return await Promise.all(postDirectories);
}

async function getPostMetadata(postId: string): Promise<PostMetadata> {
  const metadata = await getFileContent(
    path.resolve(__dirname, postId, "metadata.json")
  );
  return JSON.parse(metadata);
}

export async function getPostDetail(postId: string): Promise<PostDetail> {
  const postMdx = await getFileContent(
    path.resolve(__dirname, postId, "index.md")
  );
  const postAst = await getSvelteAST(postMdx);
  const metadata = await getPostMetadata(postId);
  return {
    id: postId,
    title: metadata.title,
    date: metadata.date,
    body: postAst
  };
}
