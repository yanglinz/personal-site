import { format } from "date-fns";

import { getPostList } from "./index";

const xml = require("xml-js");

function formatDate(date: Date) {
  return format(new Date(date), "yyyy-MM-dd,kk:mm:ss+00:00").replace(",", "T");
}

export async function getSitemap(): Promise<string> {
  const posts = await getPostList();

  const indexUrl = {
    loc: { _text: "http://yanglinzhao.com/" },
    lastmod: { _text: formatDate(posts[0].dateParsed) },
    priority: { _text: "1.00" }
  };
  const postUrls = posts.map(p => ({
    loc: { _text: `http://yanglinzhao.com/posts/${p.slug}/` },
    lastmod: { _text: formatDate(p.dateParsed) },
    priority: { _text: "0.80" }
  }));
  const urls = [indexUrl].concat(postUrls);
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
  return body;
}
