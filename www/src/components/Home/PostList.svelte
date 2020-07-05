<script>
  export let posts = [];
</script>

{#each posts as post}
  <div class="Post">
    <h3 class="Post-title">
      <a rel="prefetch" href="posts/{post.slug}">{post.title}</a>
    </h3>

    <p class="Post-date f-mono">
      <a rel="prefetch" href="posts/{post.slug}">
        <time>{post.publishedAt}</time>
      </a>
    </p>
  </div>
{/each}
