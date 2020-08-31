import fs from "fs";
import path from "path";

export async function get(req, res) {
  const manifestPath = path.resolve(
    __dirname,
    "../../../content/build/_manifest.json"
  );
  fs.readFile(manifestPath, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    }
  });
}
