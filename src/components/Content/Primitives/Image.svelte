<script>
  import ImageManifest from "../../../images/ImageManifest.svelte";

  export let node;
</script>

<ImageManifest postId={node.value.postId} relativeImagePath={node.value.url} />
