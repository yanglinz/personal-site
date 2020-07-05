<script>
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<div class="Layout">
  <Header {segment} />
  <div class="Layout-content">
    <slot />
  </div>
  <Footer />
</div>
