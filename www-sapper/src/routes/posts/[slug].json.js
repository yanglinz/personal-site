import { hasPost, getPost } from "../../posts/manifest.js";

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;
  if (await hasPost(slug)) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = await getPost(slug);
    res.end(data);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    const data = { message: "Not found" };
    res.end(JSON.stringify(data));
  }
}
