<script>
  import PortableTextNode from "./PortableTextNode.svelte";

  export let blocks = [];
</script>

{#each blocks as block}
  <PortableTextNode blocks={block.children} markDefs={block.markDefs} />
{/each}
