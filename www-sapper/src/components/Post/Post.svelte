<script>
  export let post;
</script>

<main>
  <article class="BlogPost">
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
