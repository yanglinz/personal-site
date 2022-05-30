import * as React from "react";

const h = React.createElement;

// TODO: Migrate to LayoutBase.mjs
function Head() {
  return h("head", null, [
    h("meta", { key: 1, charSet: "utf-8" }),
    h("meta", {
      key: 2,
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    }),
    h("link", { key: 3, rel: "manifest", href: "/site.webmanifest" }),
    h("meta", { key: 4, name: "theme-color", content: "#84cc16" }),
  ]);
}

// TODO: Migrate to LayoutBase.mjs
function Body() {
  return h("body", {}, h("div", null, "Hello world!"));
}

function LayoutAbout(props) {
  return h("html", { lang: "en" }, [
    h(Head, { key: 1 }, null),
    h(Body, { key: 2 }, null),
  ]);
}

export default LayoutAbout;
