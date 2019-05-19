const Sentry = require("@sentry/browser");

function setupSentry() {
  window.Sentry = Sentry;

  let enableSentry = true;
  try {
    enableSentry = !window.location.host.includes("localhost");
  } catch (e) {
    // Do nothing
  }

  if (enableSentry) {
    Sentry.init({
      dsn: "https://fa92afd5ccf24709a570b5f143f7c675@sentry.io/1463043"
    });
  }
}

exports.onClientEntry = setupSentry;
