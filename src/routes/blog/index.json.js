import * as manifest from "../../posts/manifest";

export function get(req, res) {
  const data = manifest.getManifest();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
