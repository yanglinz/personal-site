import * as React from "react";

const h = React.createElement;

function NavLink(props) {
  return h(
    "a",
    {
      className: "inline-block text-gray-700 text-base font-bold",
      href: props.href,
    },
    props.children
  );
}

function SharedHeader(props) {
  const brand = h(
    "div",
    { key: 1 },
    h(
      "h1",
      { className: "m-0 text-3xl leading-snug" },
      h(
        "a",
        { href: "/" },
        h("img", { width: "28px", src: "/brand-logo.png", alt: "Yanglin Zhao" })
      )
    )
  );
  const nav = h("nav", { key: 2 }, [
    h("div", {key: 1, className: "inline-block mr-2"}, h(NavLink, { href: "/" },"Home")),
    h("div", {key: 2, className: "inline-block mr-2"}, h(NavLink, { href: "/about" },"About")),
    h("div", {key: 3, className: "inline-block mr-0"}, h(NavLink, { href: "/posts" },"Posts")),
  ]);

  return h(
    "div",
    { className: "SharedHeader py-4 bg-green-50 lg:py-8" },

    h(
      "div",
      { className: "l-base" },
      h("div", { className: "flex items-center justify-between" }, [brand, nav])
    )
  );
}

export default SharedHeader;
