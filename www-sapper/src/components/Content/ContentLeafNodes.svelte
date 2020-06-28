<script>
  import Fragment from "./Fragment.svelte";

  export let node = [];
</script>

<!-- We need to make this a map too -->

{#if node}<!--
-->{#if node.type === 'FRAGMENT'}{node.text}{/if}<!--
-->{#if node.type === 'LINK'}<!--
--><a href={node.href}>{node.text}</a><!--
-->{/if}<!--
-->{#if node.type === 'CODE'}<!--
-->{@html node.markup}<!--
-->{/if}<!--
-->{/if}
