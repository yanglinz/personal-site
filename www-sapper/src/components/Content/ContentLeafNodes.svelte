<script>
  import Code from "./Primitives/Code.svelte";
  import Link from "./Primitives/Link.svelte";
  import Text from "./Primitives/Text.svelte";

  export let node;

  const primitives = {
    CODE: Code,
    LINK: Link,
    FRAGMENT: Text
  };
</script>

<svelte:component this={primitives[node && node.type]} {node} />
