<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`posts/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Post from "../../components/Post/Post.svelte";
  import Content from "../../components/Content/index.svelte";

  export let post;

  let excerpt;
  try {
    if (post.excerptRaw) {
      excerpt = post.excerptRaw[0].children[0].text;
    }
  } catch (e) {
    // Do nothing
  }
</script>

<svelte:head>
  <title>{post.title} | Yanglin Zhao</title>

  {#if excerpt}
    <meta name="description" content={excerpt} />
  {/if}
</svelte:head>

<Post {post}>
  <Content contentNodes={post.body.children} />
</Post>
