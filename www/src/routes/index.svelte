<script context="module">
  export function preload({ params, query }) {
    return this.fetch("posts.json")
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import Intro from "../components/Home/Intro.svelte";
  import About from "../components/Home/About.svelte";
  import Section from "../components/Home/Section.svelte";
  import PostList from "../components/Home/PostList.svelte";

  export let posts;
</script>

<svelte:head>
  <title>Yanglin Zhao</title>
</svelte:head>

<Intro />

<Section title="About">
  <About />
</Section>

<Section title="Blog Posts">
  <PostList {posts} />
</Section>
