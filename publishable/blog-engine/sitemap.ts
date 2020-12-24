import xml from "xml-js";
import { format, parse } from "date-fns";

import { getPostList } from "./index";
import config from "./config";

function parseDate(date: string): Date {
  return parse(date, "MM/dd/yyyy", new Date());
}

function formatDate(date: Date): string {
  return format(new Date(date), "yyyy-MM-dd,kk:mm:ss+00:00").replace(",", "T");
}

export async function getSitemap(): Promise<string> {
  const posts = await getPostList();

  const indexUrl = {
    loc: { _text: config.publicUrl },
    lastmod: { _text: formatDate(parseDate(posts[0].date)) },
    priority: { _text: "1.00" },
  };
  const postUrls = posts.map((p) => {
    return {
      loc: { _text: `${config.publicUrl}/posts/${p.id}/` },
      lastmod: { _text: formatDate(parseDate(p.date)) },
      priority: { _text: "0.80" },
    };
  });
  const urls = [indexUrl].concat(postUrls);
  const data = {
    urlset: [
      {
        _attributes: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
          ["xmlns:xsi"]: "http://www.w3.org/2001/XMLSchema-instance",
          ["xsi:schemaLocation"]:
            "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
        },
        url: urls,
      },
    ],
  };

  const options = { compact: true, ignoreComment: true, spaces: 2 };
  const body = xml.js2xml(data, options);
  return body;
}
