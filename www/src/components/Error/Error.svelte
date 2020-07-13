<script>
  export let status;
  export let error;

  const message =
    status === 404
      ? "Looks like we couldn't find the page you're looking for :("
      : error;

  const dev = process.env.NODE_ENV === "development";
</script>

<main class="Error">
  <h1 class="Error-title">Error #{status}</h1>
  <p class="Error-message">{message}</p>
</main>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
