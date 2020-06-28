import { getPost } from "../../posts/manifest.js";
import { getHighlightMarkup } from "../../posts//highlight.js";

export async function get(req, res, next) {
  const { slug } = req.params;

  let statusCode;
  let data;
  const post = await getPost(slug);
  if (post) {
    statusCode = 200;
    data = post;
  } else {
    statusCode = 200;
    data = { message: "Not found" };
  }

  // If the post data has raw code snippets,
  // augment it with  syntax highlighting markup
  if (data.bodyRaw) {
    data.bodyRaw = data.bodyRaw.map(d => {
      if (d._type === "code") {
        d.markup = getHighlightMarkup(d.code, d.language);
      }

      return d;
    });
  }

  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}
