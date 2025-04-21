import rss from "@astrojs/rss";
import type { RSSFeedItem } from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts");
  const til = await getCollection("til");

  let postsItems: RSSFeedItem[] = posts.map((p) => {
    return {
      link: `/posts/${p.id}`,
      pubDate: p.data.date,
    };
  });

  let tilItems: RSSFeedItem[] = til.map((t) => {
    return {
      link: `/til/${t.id}`,
      pubDate: t.data.date,
    };
  });

  let items = [...postsItems, ...tilItems].toSorted(
    (a, b) => (b.pubDate?.getTime() || 0) - (a.pubDate?.getTime() || 0),
  );
  return rss({
    title: "Yanglin Zhao",
    description: "My personal blog",
    site: "https://yanglinzhao.com",
    items,
  });
}
