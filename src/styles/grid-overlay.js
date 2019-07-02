import React from "react";

import "./grid-overlay.scss";

function GridOverlay() {
  let disableGrid = false;
  // disableGrid = true;
  if (disableGrid) {
    return null;
  }

  return <div className="GridOverlay"></div>;
}

export default GridOverlay;
