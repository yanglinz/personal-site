import * as manifest from "../../posts/manifest";

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  const hasPost = await manifest.hasPost(slug);
  if (hasPost) {
    const data = await manifest.getPost(slug);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  }
}
