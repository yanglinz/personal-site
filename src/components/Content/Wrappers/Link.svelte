<script>
  export let node;
  () => node;
</script>

<a href={node.value.url}>
  <slot />
</a>
