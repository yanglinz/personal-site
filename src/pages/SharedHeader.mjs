import * as React from "react";

const h = React.createElement;

/*
<div class="">
  <div class="l-base">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="m-0 text-3xl leading-snug">
          <a href="/">
            <img width="28px" src="/brand-logo.png" alt="Yanglin Zhao" />
          </a>
        </h1>
      </div>

      <nav>
        <a class="inline-block mr-2 text-gray-700 text-base font-bold" href="/"
          >Home</a
        >
        <a
          class="hidden inline-block mr-2 text-gray-700 text-base font-bold"
          href="/about"
        >
          About
        </a>
        <a class="inline-block text-gray-700 text-base font-bold" href="/posts"
          >Posts</a
        >
      </nav>
    </div>
  </div>
</div>
*/

function SharedHeader(props) {
  return h(
    "div",
    { className: "py-4 bg-green-50 lg:py-8" },
    h("div", { className: "flex items-center justify-between" }, [
      h(
        "div",
        { key: 1 },
        h(
          "h1",
          { className: "m-0 text-3xl leading-snug" },
          h(
            "a",
            { href: "/" },
            h("img", {
              width: "28px",
              src: "/brand-logo.png",
              alt: "Yanglin Zhao",
            })
          )
        )
      ),
    ])
  );
}

export default SharedHeader;
