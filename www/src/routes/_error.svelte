<script>
  import Error from "../components/Error/Error.svelte";

  export let status;
  export let error;
</script>

<svelte:head>
  <title>{status} | Yanglin Zhao</title>
</svelte:head>

<Error {status} {error} />
