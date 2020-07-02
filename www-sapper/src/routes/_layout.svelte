<script>
  import Header from "../components/Header.svelte";

  export let segment;
</script>

<div class="Layout">
  <Header {segment} />
  <div class="Layout-content">
    <slot />
  </div>
</div>
