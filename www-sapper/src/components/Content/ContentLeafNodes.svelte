<script>
  import Code from "./Primitives/Code.svelte";
  import Em from "./Primitives/Em.svelte";
  import Image from "./Primitives/Image.svelte";
  import Link from "./Primitives/Link.svelte";
  import Text from "./Primitives/Text.svelte";

  export let node;

  const primitives = {
    CODE: Code,
    FRAGMENT_EM: Em,
    FRAGMENT: Text,
    IMAGE: Image,
    LINK: Link
  };
</script>

<svelte:component this={primitives[node && node.type]} {node} />
