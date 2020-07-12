import { getPostsList } from "../content/manifest.js";

const xml = require("xml-js");

export async function get(req, res, next) {
  const posts = await getPostsList();

  console.log(posts);

  const indexUrl = {
    loc: { _text: "http://yanglinzhao.com/" },
    lastmod: { _text: "2020-07-12T13:39:02+00:00" },
    priority: { _text: "1.00" }
  };
  const urls = [indexUrl].concat([]);
  const data = {
    urlset: [
      {
        _attributes: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
          ["xmlns:xsi"]: "http://www.w3.org/2001/XMLSchema-instance",
          ["xsi:schemaLocation"]:
            "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        },
        url: urls
      }
    ]
  };

  const options = { compact: true, ignoreComment: true, spaces: 2 };
  const body = xml.js2xml(data, options);

  res.writeHead(200, { "Content-Type": "application/xml" });
  res.end(body);
}
