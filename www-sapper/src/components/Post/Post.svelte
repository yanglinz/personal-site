<script>
  import Image from "../Image.svelte";

  export let post;
</script>

<main>
  <article class="BlogPost">
    {#if post.mainImage}
      <div class="BlogPost-image">
        <Image src={post.mainImage.asset.url} />
      </div>
    {/if}

    <div class="l-wide">
      <div class="BlogPost-metadata">
        <h1 class="BlogPost-title">
          <a rel="prefetch" href="posts/{post.slug}">{post.title}</a>
        </h1>

        <time class="BlogPost-date">{post.publishedAt}</time>
      </div>
    </div>

    <div class="l-narrow">
      <div class="BlogPost-content">
        <slot />
      </div>
    </div>
  </article>
</main>
