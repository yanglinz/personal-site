<script>
  import Layout from "../components/Layout.svelte";

  export let segment;
</script>

<Layout {segment}>
  <slot />
</Layout>
