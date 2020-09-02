<script>
  import Image from "svelte-image";

  export let postId;
  export let relativeImagePath;
</script>

<!-- This is an auto-generated file from content/images/index.ts -->

{#if postId == 'hello-blog' && relativeImagePath == './banner.jpeg'}
  <Image src="content-posts/hello-blog/banner.jpeg" />
{/if}
{#if postId == 'service-boundaries' && relativeImagePath == './banner.jpg'}
  <Image src="content-posts/service-boundaries/banner.jpg" />
{/if}
{#if postId == 'using-honeycomb' && relativeImagePath == './honeycomb-bubble-1.png'}
  <Image src="content-posts/using-honeycomb/honeycomb-bubble-1.png" />
{/if}
{#if postId == 'using-honeycomb' && relativeImagePath == './honeycomb-bubble-2.png'}
  <Image src="content-posts/using-honeycomb/honeycomb-bubble-2.png" />
{/if}
{#if postId == 'using-honeycomb' && relativeImagePath == './honeycomb-heatmap.png'}
  <Image src="content-posts/using-honeycomb/honeycomb-heatmap.png" />
{/if}
{#if postId == 'using-honeycomb' && relativeImagePath == './honeycomb-tracing.png'}
  <Image src="content-posts/using-honeycomb/honeycomb-tracing.png" />
{/if}
{#if postId == 'using-honeycomb' && relativeImagePath == './newrelic-overview.png'}
  <Image src="content-posts/using-honeycomb/newrelic-overview.png" />
{/if}
{#if postId == 'utils-antipattern' && relativeImagePath == './banner.jpg'}
  <Image src="content-posts/utils-antipattern/banner.jpg" />
{/if}
