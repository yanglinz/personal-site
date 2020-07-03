<script>
  import ContentLeafNodes from "./ContentLeafNodes.svelte";
  import Code from "./Wrappers/Code.svelte";
  import Fragment from "./Wrappers/Fragment.svelte";
  import H1 from "./Wrappers/H1.svelte";
  import H2 from "./Wrappers/H2.svelte";
  import H3 from "./Wrappers/H3.svelte";
  import H4 from "./Wrappers/H4.svelte";
  import H5 from "./Wrappers/H5.svelte";
  import H6 from "./Wrappers/H6.svelte";
  import P from "./Wrappers/P.svelte";

  export let nodes = [];

  const wrappers = {
    CODE: Code,
    FRAGMENT_EM: Fragment,
    FRAGMENT: Fragment,
    H1: H1,
    H2: H2,
    H3: H3,
    H4: H4,
    H5: H5,
    H6: H6,
    IMAGE: Fragment,
    LINK: Fragment,
    P: P,
  };
</script>

<!--
  Note that svelte has some quirks when it comes to outputting
  whitespaces that matters when we're dealing with links and periods.
  This really ugly hack/workaround with comments makes sure that we're
  not outputting markup that affects rendering in the markup.
  See https://github.com/sveltejs/svelte/issues/3080.
-->

{#each nodes as node}<!--
--><svelte:component this={wrappers[node.type]}><!--
-->{#if node.children}<!--
--><svelte:self nodes={node.children} /><!--
-->{/if}<!--
--><ContentLeafNodes {node} /><!--
--></svelte:component>
{/each}
