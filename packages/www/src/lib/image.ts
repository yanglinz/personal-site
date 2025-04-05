import path from "node:path";
import EleventyImage from "@11ty/eleventy-img";
import { type CollectionEntry } from "astro:content";
import { getGlobalConfig, getId } from "./astro";

export async function getFeaturedImagePath(id: string, post: CollectionEntry<"posts">) {
  console.log('id', id);
  console.log('post', post);

  const config = await getGlobalConfig();
  return path.resolve(
    config.rootPath,
    "src/content/posts",
    id,
    post.data.featuredImage,
  );
}

export async function getPostImagePath(mdocContext: CollectionEntry<"posts">, relativeSrc: string) {
  const config = await getGlobalConfig();
  return path.resolve(config.rootPath, "src/content/posts", getId(mdocContext), relativeSrc);
}

export async function imageMarkup(src: string, alt: string) {
  const config = await getGlobalConfig();
  const sizes = "(min-width: 30em) 50vw, 100vw";

  let metadata = await EleventyImage(src, {
    widths: [480, 780, 1000, 1400, 2200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: path.join(config.rootPath, "public/img"),
    urlPath: "/img/",
  });

  if (!metadata) {
    throw new Error('Failed to generate image metadata');
  }

  // @ts-ignore
  let lowsrc = metadata.jpeg[0];
  // @ts-ignore
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  const sources = Object.values(metadata)
    .map((imageFormat) => {
      // @ts-ignore
      const type = imageFormat[0].sourceType;
      const srcset = imageFormat.map((entry) => entry.srcset).join(", ");
      return `<source type="${type}" srcset="${srcset}" sizes="${sizes}">`;
    })
    .join("\n");

  // @ts-ignore
  let imgSrc = lowsrc.url;
  // @ts-ignore
  return `<div class="s-image" style="aspect-ratio: ${highsrc.width} / ${highsrc.height}">
    <picture>
      ${sources}
      <img
        src="${imgSrc}"
        alt="${alt}"
        width="100%"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>`;
}
