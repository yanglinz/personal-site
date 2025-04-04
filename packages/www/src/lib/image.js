import path from "node:path";
import EleventyImage from "@11ty/eleventy-img";
import { getGlobalConfig } from "./astro";

export async function getFeaturedImagePath(slug, data) {
  const config = await getGlobalConfig();
  return path.resolve(
    config.rootPath,
    "src/content/posts",
    slug,
    data.featuredImage,
  );
}

export async function getPostImagePath(mdocContext, relativeSrc) {
  const config = await getGlobalConfig();
  let slug = mdocContext.slug.split("/")[0];
  return path.resolve(config.rootPath, "src/content/posts", slug, relativeSrc);
}

export async function imageMarkup(src, alt) {
  const config = await getGlobalConfig();
  const sizes = "(min-width: 30em) 50vw, 100vw";

  let metadata = await EleventyImage(src, {
    widths: [480, 780, 1000, 1400, 2200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: path.join(config.rootPath, "public/img"),
    urlPath: "/img/",
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  const sources = Object.values(metadata)
    .map((imageFormat) => {
      const type = imageFormat[0].sourceType;
      const srcset = imageFormat.map((entry) => entry.srcset).join(", ");
      return `<source type="${type}" srcset="${srcset}" sizes="${sizes}">`;
    })
    .join("\n");

  return `<div class="s-image" style="aspect-ratio: ${highsrc.width} / ${highsrc.height}">
    <picture>
      ${sources}
      <img
        src="${lowsrc.url}"
        alt="${alt}"
        width="100%"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>`;
}
