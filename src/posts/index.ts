import fs from "fs";
import path from "path";

import { parse } from "date-fns";

import { SvelteAST } from "../mdx/index";
import { getSvelteAST, walkSvelteAST } from "../mdx/index";

export interface Post {
  id: string;
  slug: string;
  title: string;
  description?: string;
  date: string;
  dateParsed: Date;
  published: boolean;
}

export interface PostMetadata {
  title: string;
  date: string;
  description?: string;
  published?: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
}

export interface PostDetail {
  id: string;
  slug: string;
  title: string;
  description?: string;
  date: string;
  dateParsed: Date;
  published: boolean;
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
        description: metadata.description,
        date: metadata.date,
        dateParsed: parse(metadata.date, "MM/dd/yyyy", new Date()),
        published: Boolean(metadata.published)
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
  const metadata = await getPostMetadata(postId);

  const postMdx = await getFileContent(
    path.resolve(__dirname, postId, "index.md")
  );
  const postAst = await getSvelteAST(postMdx);
  walkSvelteAST(postAst, n => {
    if (n.type === "image" && n.value) {
      n.value.postId = postId;
    }
  });

  return {
    id: postId,
    slug: postId,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    dateParsed: parse(metadata.date, "MM/dd/yyyy", new Date()),
    published: Boolean(metadata.published),
    featuredImage: metadata.featuredImage,
    featuredImageAlt: metadata.featuredImageAlt,
    body: postAst
  };
}
