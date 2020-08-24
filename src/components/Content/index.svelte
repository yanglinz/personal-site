<script>
  import ContentNodes from "./ContentNodes.svelte";
  import { getAllMarks, nestLists, parsePortableText } from "./parser.js";

  export let portableText;

  const marks = getAllMarks(portableText);
  let parsed = nestLists(portableText);
  parsed = parsePortableText(parsed, marks);
</script>

<ContentNodes nodes={parsed} />
