<script>
  import ContentLeafNodes from "./ContentLeafNodes.svelte";
  import H1 from "./H1.svelte";
  import H2 from "./H2.svelte";
  import H3 from "./H3.svelte";
  import H4 from "./H4.svelte";
  import H5 from "./H5.svelte";
  import H6 from "./H6.svelte";
  import P from "./P.svelte";
  import Code from "./Code.svelte";
  import Fragment from "./Fragment.svelte";

  export let nodes = [];

  const parentComponents = {
    H1: H1,
    H2: H2,
    H3: H3,
    H4: H4,
    H5: H5,
    H6: H6,
    P: P,
    FRAGMENT: Fragment,
    LINK: Fragment,
    CODE: Code,
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
