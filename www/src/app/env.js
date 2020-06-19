export let DEV = false;
try {
  DEV = window.location.hostname.endsWith("localhost");
} catch (e) {
  // Do nothing
}
