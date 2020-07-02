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
  import Intro from "../components/Intro.svelte";
  import IndexSection from "../components/IndexSection.svelte";
  import PostList from "../components/PostList.svelte";

  export let posts;
</script>

<svelte:head>
  <title>Yanglin Zhao</title>
</svelte:head>

<Intro />

<IndexSection title="About">
  <p class="About-text">
    Hello
    <span role="img" aria-label="Waving hand">&#x1F44B;.</span>
    I'm a software engineer based in Washington DC. I mainly make things that
    run in browsers. I currently work at
    <a href="https://www.pbs.org/">PBS</a>
    as a Principal Engineer to help make high quality media accessible.
  </p>
</IndexSection>

<IndexSection title="Blog Posts">
  <PostList {posts} />
</IndexSection>
