<script>
  import LazyImage from "./LazyImage.svelte";

  export let image;
  export let maxWidth = 1440;

  const imageMetadata = (image.asset && image.asset.metadata) || {};
  const aspectRatio = imageMetadata.dimensions
    ? imageMetadata.dimensions.aspectRatio
    : 1.67;
  const inlineViewbox = `0 0 ${aspectRatio} 1`;
  const inlinePlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${inlineViewbox}'%3E%3C/svg%3E`;

  let src = (image.asset && image.asset.url) || "";
  const placeholder = src + "?w=200&blur=100";

  let breakpoints = [1, 2, 3, 4, 5];
  breakpoints = breakpoints.map((b) => (b / breakpoints.length) * maxWidth);
  let srcset = breakpoints.map((b) => {
    const imagePath = src + `?w=${b}`;
    return `${imagePath} ${b}w`;
  });
  let sizes = breakpoints.map((b, i) => {
    const isLast = i === breakpoints.length - 1;
    if (isLast) {
      return `${b}px`;
    }
    return `(max-width: ${b + 100}px) ${b}px`;
  });

  srcset = srcset.join(", ");
  sizes = sizes.join(", ");
</script>

<style>
  .SanityImage {
    display: grid;
  }

  .SanityImage-ratio-placeholder,
  .SanityImage-image {
    grid-column: 1;
    grid-row: 1;
  }

  .SanityImage-image {
    display: flex;
  }
</style>

<div class="SanityImage">
  <div aria-hidden="true" class="SanityImage-ratio-placeholder">
    <img src={inlinePlaceholder} alt={image.alt} />
  </div>
  <div class="SanityImage-image">
    <LazyImage {src} {srcset} {sizes} {placeholder} alt={image.alt} />
  </div>
</div>
