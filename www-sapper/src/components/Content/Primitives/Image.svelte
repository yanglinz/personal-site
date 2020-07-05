<script>
  import Image from "../../Image.svelte";

  export let node;
</script>

<Image alt={node.alt} src={node.metadata.url} />
