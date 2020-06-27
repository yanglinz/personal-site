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

<!--
  Note that svelte has some quirks when it comes to outputting
  whitespaces that matters when we're dealing with links and periods.
  This really ugly hack/workaround with comments makes sure that we're
  not outputting markup that affects rendering in the markup.
  See https://github.com/sveltejs/svelte/issues/3080.
-->

{#each nodes as node}<!--
--><svelte:component this={getParentComponent(node.type)}><!--
-->{#if node.children}<!--
--><svelte:self nodes={node.children} /><!--
-->{/if}<!--
--><ContentLeafNodes {node} /><!--
--></svelte:component>
{/each}
