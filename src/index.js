import unregisterServiceWorker from "./service-worker";

import "normalize.css/normalize.css";
import "./global.css";
import "../layouts/partials/header.css";
import "../layouts/partials/home.css";

function main() {
  // Initialization script here!
}

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

unregisterServiceWorker();
ready(main);
