import React, { Component } from "react";

import "./index.css";

function Demo(props) {
  return (
    <div className="Demo">
      <div className="Demo-inner">{props.children}</div>
    </div>
  );
}

export default Demo;
