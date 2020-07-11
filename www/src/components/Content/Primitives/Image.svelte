<script>
  import SanityImage from "../../SanityImage.svelte";

  export let node;
</script>

<SanityImage image={node.metadata} maxWidth={750} />
