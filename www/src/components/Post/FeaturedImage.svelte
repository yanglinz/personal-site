<script>
  import Image from "../Image.svelte";

  export let image;

  const url = image.asset.url;
  const preloadUrl = url + "?blur=300&w=250";
</script>

<Image src={url} placeholder={preloadUrl} alt={image.alt} />
