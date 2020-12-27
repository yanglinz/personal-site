import fs from "fs";
import path from "path";

import { parse } from "date-fns";

import { getFileContent } from "./helpers/fs";
import { getContentAst } from "./markdown";
import { ImageMetadata, getImageMetadata } from "./image";
import config from "./config";

type ToBeTyped = any;

function parseDate(date: string): Date {
  return parse(date, "MM/dd/yyyy", new Date());
}

export interface PostMetadata {
  id: string;
  urlPath: string;
  title: string;
  date: string;
  description?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  published?: boolean;
}

export type PostImages = { [key: string]: ImageMetadata };

export interface PostContent {
  ast: ToBeTyped;
  images: PostImages;
}

export async function getPostMetadata(postId: string): Promise<PostMetadata> {
  const urlPath = `/posts/${postId}`;
  const metadata = await getFileContent(
    path.resolve(config.contentPath, postId, "metadata.json")
  );

  const postData = JSON.parse(metadata);
  const { title, date, published } = postData;
  const description = postData.description || null;

  let featuredImage = postData.featuredImage || null;
  if (featuredImage) {
    featuredImage = path.join("/content/", postId, featuredImage);
  }
  const featuredImageAlt = postData.featuredImageAlt || null;

  return {
    id: postId,
    urlPath,
    title,
    date,
    description,
    featuredImage,
    featuredImageAlt,
    published,
  };
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

  const sorted = posts.sort((p1, p2) =>
    parseDate(p1.date) < parseDate(p2.date) ? 1 : -1
  );
  return sorted;
}

export async function postExists(postId: string): Promise<boolean> {
  const postList = await getPostList();
  const post = postList.filter((p) => p.id === postId)[0];
  return Boolean(post);
}

export async function getPostImages(postId: string): Promise<PostImages> {
  const postDir = path.join(config.contentPath, postId);
  let imageFiles = fs.readdirSync(postDir, { withFileTypes: true });

  const isImageName = (fileName: string) => {
    const imageExtensions = ["png", "jpg", "jpeg"];
    const extension: string = fileName.split(".").pop() || "";
    return imageExtensions.includes(extension);
  };
  imageFiles = imageFiles
    .filter((f) => f.isFile())
    .filter((f) => isImageName(f.name));

  let images: PostImages = {};
  for (const i of imageFiles) {
    const imagePath = path.join(postDir, i.name);
    const metadata = await getImageMetadata(imagePath);
    const relativePath = path.join("/content/", postId, i.name);
    images[relativePath] = metadata;
  }

  return images;
}

export async function getPostContent(
  postId: string,
  contentPath: string
): Promise<PostContent> {
  const content = await getFileContent(
    path.resolve(config.contentPath, postId, contentPath)
  );
  const ast = await getContentAst(content);
  const images = await getPostImages(postId);

  return { ast, images };
}
