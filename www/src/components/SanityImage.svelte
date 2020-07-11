<script>
  import LazyImage from "./LazyImage.svelte";

  export let image;
  export let maxWidth;

  const imageMetadata = image.asset.metadata;
  const aspectRatio = imageMetadata
    ? imageMetadata.dimensions.aspectRatio
    : 1.67;
  const inlineViewbox = `0 0 ${aspectRatio} 1`;
  const inlinePlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${inlineViewbox}'%3E%3C/svg%3E`;
</script>

<style>
  .LazyImage {
    background: #333;
  }
</style>

<div class="LazyImage">
  <img src={inlinePlaceholder} alt="Lazy loading test" />
</div>
