import fs from "fs";
import path from "path";

function getPostData(postSlug) {
  const postPath = path.resolve(__dirname, `../../build/${postSlug}.json`);
  return new Promise((resolve, reject) => {
    fs.readFile(postPath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

export async function get(req, res, next) {
  const { slug } = req.params;

  try {
    const data = await getPostData(slug);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
}
