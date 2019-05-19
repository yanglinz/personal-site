const Sentry = require("@sentry/browser");

function setupSentry() {
  Sentry.init({
    dsn: "https://fa92afd5ccf24709a570b5f143f7c675@sentry.io/1463043"
  });
  window.Sentry = Sentry;
}

exports.onClientEntry = setupSentry;
