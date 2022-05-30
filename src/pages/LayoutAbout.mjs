import * as React from "react";

import LayoutBase from "./LayoutBase.mjs";

const h = React.createElement;

function LayoutAbout(props) {
  return h(LayoutBase, null, h("div", null, "Hello world!"));
}

export default LayoutAbout;
