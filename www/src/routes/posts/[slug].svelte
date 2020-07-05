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
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<Post {post}>
  <Content portableText={post.bodyRaw} />
</Post>
