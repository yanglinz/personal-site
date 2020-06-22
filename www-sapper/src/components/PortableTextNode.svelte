<script>
  export let blocks = [];
  export let markDefs = [];
</script>

<p>
  {#each blocks as block}{block.text}{/each}
</p>
