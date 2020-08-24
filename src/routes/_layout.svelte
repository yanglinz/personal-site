<script>
  import Analytics from "../components/Analytics.svelte";
  import Layout from "../components/Layout.svelte";

  export let segment;
</script>

<Analytics />

<Layout {segment}>
  <slot />
</Layout>
