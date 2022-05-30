import * as React from "react";

const h = React.createElement;

function LayoutAbout(props) {
  return h("html", { lang: "en" }, h("div", null, "Hello world!"));
}

export default LayoutAbout;
