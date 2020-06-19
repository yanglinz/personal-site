import React from "react";

import * as env from "../app/env";

import "./grid-provider.scss";

function GridProvider(props) {
  if (!env.DEV || true) {
    return props.children;
  }

  return (
    <div className="GridProvider">
      <div className="GridProvider-grid"></div>
      <div className="GridProvider-content">{props.children}</div>
    </div>
  );
}

export default GridProvider;
