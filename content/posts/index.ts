import fs from "fs";
import path from "path";

import { format, parse } from "date-fns";

import { SvelteAST } from "../mdx";
import { getSvelteAST } from "../mdx";

export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateParsed: Date;
}

export interface PostMetadata {
  title: string;
  date: string;
  featuredImage?: string;
  featuredImageAlt?: string;
}

export interface PostDetail {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateParsed: Date;
  body: SvelteAST;
  featuredImage?: string;
  featuredImageAlt?: string;
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
      return {
        id: postId,
        slug: postId,
        title: metadata.title,
        date: metadata.date,
        dateParsed: parse(metadata.date, "MM/dd/yyyy", new Date())
      };
    });
  const posts = await Promise.all(postDirectories);
  return posts.sort((p1, p2) =>
    // Sort posts by published date
    p1.dateParsed.getTime() > p2.dateParsed.getTime() ? -1 : 1
  );
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
    slug: postId,
    title: metadata.title,
    date: metadata.date,
    dateParsed: parse(metadata.date, "MM/dd/yyyy", new Date()),
    featuredImage: metadata.featuredImage,
    featuredImageAlt: metadata.featuredImageAlt,
    body: postAst
  };
}
