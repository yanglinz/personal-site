<script>
  import ContentNodes from "./ContentNodes.svelte";
  import { nestLists, parsePortableText } from "./parser.js";

  export let portableText;

  let parsed = nestLists(portableText);
  parsed = parsePortableText(parsed);
</script>

<ContentNodes nodes={parsed} />
