import type { NextApiRequest, NextApiResponse } from "next";

import { postExists, getPostContent } from "../../../publishable/blog-engine";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, contentPath } = req.query;

  const parsedPostId: string = Array.isArray(postId) ? postId[0] : postId;
  const parsedContentPath: string = Array.isArray(contentPath)
    ? contentPath[0]
    : contentPath;

  if (!contentPath) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json({});
  } else if (!(await postExists(parsedPostId))) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.json({});
  } else {
    const data = await getPostContent(parsedPostId, parsedContentPath);
    res.json(data);
  }
}

export default handler;
