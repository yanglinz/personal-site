import { postExists, getPostContent } from "../../../publishable/blog-engine";

async function handler(req, res) {
  const { postId, contentPath } = req.query;

  if (!contentPath) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json({});
  } else if (!(await postExists(postId))) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.json({});
  } else {
    const data = await getPostContent(postId, contentPath);
    res.json(data);
  }
}

export default handler;
