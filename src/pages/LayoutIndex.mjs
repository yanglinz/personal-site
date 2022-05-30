import * as React from "react";

const h = React.createElement;

function LayoutIndex(props) {
  return h("html", { lang: "en" }, h("div", null, "Hello world!"));
}

export default LayoutIndex;
