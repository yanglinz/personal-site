import fs from "fs";
import path from "path";

import { Post, getPostList } from "../posts/index";

export interface Image {
  postId: string;
  relativePath: string;
}

function getPostImages(post: Post): Image[] {
  const postDir = path.resolve(__dirname, "../posts", post.slug);
  const contents = fs.readdirSync(postDir, { withFileTypes: true });
  return contents
    .filter(
      d =>
        d.name.endsWith(".jpg") ||
        d.name.endsWith(".jpeg") ||
        d.name.endsWith(".png")
    )
    .map(d => ({
      postId: post.id,
      relativePath: "./" + d.name
    }));
}

function getImageList(postList: Post[]): Image[] {
  const nestedImages = postList.map(getPostImages);
  return nestedImages.flat();
}

const componentHeader = `
<script>
  import Image from "svelte-image";

  export let postId;
  export let relativeImagePath;
</script>

<!-- This is an auto-generated file from content/images/index.ts -->

`;

export async function getImageComponent(): Promise<string> {
  const posts = await getPostList();
  const imageList = getImageList(posts);

  let component = "";
  component += componentHeader;

  imageList.forEach(i => {
    // The image path is defined via SvelteImage component in the rollup config
    const imagePath = path.join("posts", i.postId, i.relativePath);
    let imageMarkup = "";
    imageMarkup += `{#if postId == '${i.postId}' && relativeImagePath == '${i.relativePath}'}\n`;
    imageMarkup += `  <Image src="${imagePath}" />\n`;
    imageMarkup += "{/if}\n";

    component += imageMarkup;
  });

  return component.trimLeft();
}
