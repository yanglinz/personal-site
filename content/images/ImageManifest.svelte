<script>
  import Image from "svelte-image";

  export let postId;
  export let relativeImagePath;
</script>

{#if postId == 'hello-blog' && relativeImagePath == './banner.jpeg'}
  <Image src="content-posts/hello-blog/banner.jpeg" />
{/if}
