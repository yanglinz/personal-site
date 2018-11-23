import unregisterServiceWorker from "./service-worker";

import "normalize.css/normalize.css";
import "./global.scss";
import "../layouts/partials/header.scss";
import "../layouts/partials/home.scss";
import "../layouts/partials/article.scss";
import "../layouts/partials/post-list.scss";

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
