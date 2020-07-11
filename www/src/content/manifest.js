import { format } from "date-fns";
import { getHighlightMarkup } from "./highlight.js";
import * as env from "../environment.js";

const fetch = require("isomorphic-fetch");

const POST_LIST_QUERY = `{
  allPost {
    title
    publishedAt
    slug {
      current
    }
  }
}`;

function parsePostsList(data) {
  return data.data.allPost
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .map(p => {
      return {
        title: p.title,
        slug: p.slug.current,
        publishedAt: format(new Date(p.publishedAt), "MMM.dd.yyyy")
      };
    });
}

export async function getPostsList() {
  const url = env.GRAPHQL_URL;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: POST_LIST_QUERY })
  };
  const resp = await fetch(url, params);
  const data = await resp.json();
  return parsePostsList(data);
}

const POST_QUERY = `{
  allPost(where: { slug: { current: { eq: "{POST_SLUG}" } } }) {
    title
    publishedAt
    slug {
      current
    }
    mainImage {
      asset {
        url
        metadata {
          dimensions {
            width
            height
            aspectRatio
          }
        }
      }
      link
      alt
    }
    bodyRaw
  }
  allSanityImageAsset {
    assetId
    url
    metadata {
      dimensions {
        width
        height
        aspectRatio
      }
    }
  }
}`;

function parsePost(data) {
  const post = data.data.allPost[0];
  if (!post) {
    return null;
  }

  const assets = data.data.allSanityImageAsset || [];
  let assetsById = {};
  assets.forEach(a => {
    assetsById[a.assetId] = a;
  });

  let bodyRaw = post.bodyRaw;
  if (bodyRaw) {
    bodyRaw = bodyRaw.map(d => {
      // augment the post body with image data
      if (d._type === "contentImage") {
        let imageId = d.asset._ref;
        imageId = imageId.replace("image-", "");
        imageId = imageId.split("-")[0];
        d.metadata = assetsById[imageId];
      }

      // augment the post body with syntax highlighting markup
      if (d._type === "code") {
        d.markup = getHighlightMarkup(d.code, d.language);
      }

      return d;
    });
  }

  return {
    title: post.title,
    slug: post.slug.current,
    publishedAt: format(new Date(post.publishedAt), "MMM do, yyyy"),
    mainImage: post.mainImage,
    bodyRaw
  };
}

export async function getPost(slug) {
  const url = env.GRAPHQL_URL;
  const query = POST_QUERY.replace("{POST_SLUG}", slug);
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };
  const resp = await fetch(url, params);
  const data = await resp.json();
  return parsePost(data);
}
