import * as manifest from "../../engine/content-manifest";

export async function get(req, res) {
  const data = await manifest.getManifest();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
