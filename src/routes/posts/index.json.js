import { getPostsList } from "../../content/manifest.js";

export async function get(req, res) {
  const data = await getPostsList();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
