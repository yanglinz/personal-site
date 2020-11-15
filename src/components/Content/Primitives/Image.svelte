<script>
  import ImageManifest from "../../../../content/images/ImageManifest.svelte";

  export let node;
</script>

<ImageManifest postId={node.value.postId} relativeImagePath={node.value.url} />
