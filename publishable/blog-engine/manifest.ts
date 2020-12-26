import fs from "fs";
import path from "path";

import { parse } from "date-fns";

import { getFileContent } from "./helpers/fs";
import { getContentAst } from "./markdown";
import config from "./config";

type ToBeTyped = any;

export interface PostMetadata {
  id: string;
  urlPath: string;
  title: string;
  date: string;
  description?: string;
  published?: boolean;
}

export interface PostContent {
  ast: ToBeTyped;
}

export async function getPostMetadata(postId: string): Promise<PostMetadata> {
  const urlPath = `/posts/${postId}`;
  const metadata = await getFileContent(
    path.resolve(config.contentPath, postId, "metadata.json")
  );

  const postData = JSON.parse(metadata);
  const { title, date, published } = postData;
  const description = postData.description || null;
  return { id: postId, urlPath, title, date, description, published };
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
