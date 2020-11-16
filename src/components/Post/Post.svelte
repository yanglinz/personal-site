<script>
  import FeaturedImage from "./FeaturedImage.svelte";
  import ImageManifest from "../../../content/images/ImageManifest.svelte";

  export let post;
</script>

<main>
  <article class="BlogPost">
    {#if post.featuredImage}
      <div class="BlogPost-image">
        <ImageManifest
          postId={post.id}
          relativeImagePath={post.featuredImage} />
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
