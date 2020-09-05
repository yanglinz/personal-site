import fs from "fs";
import path from "path";

function getManifest() {
  const manifestPath = path.resolve(
    __dirname,
    "../../../content/build/_manifest.json"
  );

  return new Promise((resolve, reject) => {
    fs.readFile(manifestPath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          let parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

export async function get(req, res) {
  try {
    let data = await getManifest();
    data = data.filter(
      p => p.published || process.env.NODE_ENV === "development"
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}
