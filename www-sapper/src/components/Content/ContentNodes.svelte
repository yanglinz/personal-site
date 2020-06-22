<script>
  import ContentLeafNodes from "./ContentLeafNodes.svelte";
  import P from "./P.svelte";
  import Fragment from "./Fragment.svelte";

  export let nodes = [];

  const parentComponents = {
    P: P,
    FRAGMENT: Fragment,
    LINK: Fragment
  };

  function getParentComponent(type) {
    return parentComponents[type];
  }
</script>

{#each nodes as node}<!--
--><svelte:component this={getParentComponent(node.type)}><!--
-->{#if node.children}<!--
--><svelte:self nodes={node.children} /><!--
-->{/if}<!--
--><ContentLeafNodes {node} /><!--
--></svelte:component>
{/each}
