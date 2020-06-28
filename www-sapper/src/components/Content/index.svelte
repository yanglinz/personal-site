<script>
  import ContentNodes from "./ContentNodes.svelte";
  import { parsePortableText } from "./parser.js";

  export let portableText;
</script>

<ContentNodes nodes={parsePortableText(portableText)} />
