<script>
  import Code from "./Primitives/Code.svelte";
  import CodeBlock from "./Primitives/CodeBlock.svelte";
  import Em from "./Primitives/Em.svelte";
  import Image from "./Primitives/Image.svelte";
  import Link from "./Primitives/Link.svelte";
  import Text from "./Primitives/Text.svelte";

  export let node;

  const primitives = {
    code: CodeBlock,
    image: Image,
    inlineCode: Code,
    text: Text
  };
</script>

<svelte:component this={primitives[node && node.type]} {node} />
