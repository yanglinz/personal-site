import "normalize.css/normalize.css";
import "./global.css";
import "../layouts/partials/header.css";
import "../layouts/partials/home.css";

import { initBackgroundImage } from "../layouts/partials/home";

function main() {
  initBackgroundImage();
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

ready(main);
