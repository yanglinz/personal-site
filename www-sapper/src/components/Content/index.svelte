<script>
  import ContentNodes from "./ContentNodes.svelte";
  import { parsePortableText } from "./parser.js";

  export let portableText;

  const debugBefore = portableText;
  const debugAfter = parsePortableText(portableText);
  console.log(debugBefore);
  console.log(debugAfter);
</script>

<ContentNodes nodes={parsePortableText(portableText)} />
