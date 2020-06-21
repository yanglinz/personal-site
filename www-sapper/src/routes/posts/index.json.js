import { getPostsList } from "../../posts/manifest.js";

export function get(req, res) {
  const data = getPostsList();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
