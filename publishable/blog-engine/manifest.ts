import fs from "fs";
import path from "path";

import { getFileContent } from "./helpers/fs";
import { getContentAst } from "./markdown";
import config from "./config";

type ToBeTyped = any;

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  description?: string;
  published?: boolean;
}

export interface PostContent {
  ast: ToBeTyped;
}

async function getPostMetadata(postId: string): Promise<PostMetadata> {
  const metadata = await getFileContent(
    path.resolve(config.contentPath, postId, "metadata.json")
  );
  return { id: postId, ...JSON.parse(metadata) };
}

export async function getPostList(): Promise<PostMetadata[]> {
  const files = fs.readdirSync(config.contentPath, { withFileTypes: true });
  const postDirectories = files
    .filter((f) => f.isDirectory())
    .map(async (f) => {
      const postId = f.name;
      return await getPostMetadata(postId);
    });
  const posts = await Promise.all(postDirectories);
  return posts;
}

export async function postExists(postId: string): Promise<boolean> {
  const postList = await getPostList();
  const post = postList.filter((p) => p.id === postId)[0];
  return Boolean(post);
}

export async function getPostContent(
  postId: string,
  contentPath: string
): Promise<PostContent> {
  const content = await getFileContent(
    path.resolve(config.contentPath, postId, contentPath)
  );
  const ast = await getContentAst(content);
  return { ast };
}
