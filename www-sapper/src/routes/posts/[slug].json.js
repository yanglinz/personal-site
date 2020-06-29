import { getPost } from "../../posts/manifest.js";

export async function get(req, res, next) {
  const { slug } = req.params;

  let statusCode;
  let data;
  const post = await getPost(slug);
  if (post) {
    statusCode = 200;
    data = post;
  } else {
    statusCode = 200;
    data = { message: "Not found" };
  }

  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
