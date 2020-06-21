import { hasPost, getPost } from "../../posts/manifest.js";

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  if (hasPost(slug)) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(getPost(slug));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  }
}
