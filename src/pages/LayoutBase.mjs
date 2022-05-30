import * as React from "react";

import SharedHeader from "./SharedHeader.mjs";

const h = React.createElement;

function Head() {
  const content = [
    h("meta", { charSet: "utf-8" }),
    h("meta", {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    }),
    h("link", { rel: "manifest", href: "/site.webmanifest" }),
    h("meta", { name: "theme-color", content: "#84cc16" }),

    // Google fonts
    h("link", {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    }),
    h("link", {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    }),
    h("link", {
      rel: "stylesheet",
      href:
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
    }),

    // Main scripts
    h("link", { rel: "stylesheet", href: "/main.css" }),
    h("script", {
      defer: true,
      ["data-domain"]: "yanglinzhao.com",
      src: "https://plausible.io/js/plausible.js",
    }),
  ];

  return h(
    "head",
    null,
    content.map((e, i) => {
      return React.cloneElement(e, { ...e.props, key: i });
    })
  );
}

function Body(props) {
  console.log("body");
  return h(
    "body",
    {},
    h("div", null, [
      h(SharedHeader, { key: 1 }, null),
      h("div", { key: 2 }, props.children),
    ])
  );
}

function LayoutBase(props) {
  return h("html", { lang: "en" }, [
    h(Head, { key: 1 }, null),
    h(Body, { key: 2 }, props.children),
  ]);
}

export default LayoutBase;
