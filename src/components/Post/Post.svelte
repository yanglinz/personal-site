<script>
  import FeaturedImage from "./FeaturedImage.svelte";

  export let post;
</script>

<main>
  <article class="BlogPost">
    {#if post.mainImage}
      <div class="BlogPost-image">
        <FeaturedImage image={post.mainImage} />
      </div>
    {/if}

    <div class="l-wide">
      <div class="BlogPost-metadata">
        <h1 class="BlogPost-title">
          <a rel="prefetch" href="posts/{post.slug}">{post.title}</a>
        </h1>

        <time class="BlogPost-date">{post.date}</time>
      </div>
    </div>

    <div class="l-narrow">
      <div class="BlogPost-content">
        <slot />
      </div>
    </div>
  </article>
</main>
