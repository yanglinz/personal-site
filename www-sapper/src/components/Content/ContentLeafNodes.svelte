<script>
  import Fragment from "./Fragment.svelte";

  export let node = [];
</script>

{#if node}
  {#if node.type === 'FRAGMENT'}{node.text}{/if}
  {#if node.type === 'LINK'}
    <a href={node.href}>{node.text}</a>
  {/if}
{/if}
