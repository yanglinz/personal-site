<script>
  import { onMount } from "svelte";

  export let placeholder;
  export let src = undefined;
  export let srcset = undefined;
  export let sizes = undefined;
  export let alt;

  let imgElement;
  let path;

  let observer;
  let intersected = false;

  $: path = intersected ? src : placeholder;

  let observerCallback = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        intersected = true;
        observer.unobserve(imgElement);
      }
    });
  };

  onMount(() => {
    observer = new IntersectionObserver(observerCallback);
    observer.observe(imgElement);

    return () => {
      observer.unobserve(imgElement);
    };
  });
</script>

{#if intersected}
  <img src={path} {srcset} {sizes} {alt} bind:this={imgElement} />
{:else}
  <img src={path} {alt} bind:this={imgElement} />
{/if}
