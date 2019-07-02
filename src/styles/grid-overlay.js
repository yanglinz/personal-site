import React from "react";

import "./grid-overlay.scss";

function GridOverlay() {
  let disableGrid = false;
  disableGrid = true;  // comment this out to display grid
  if (disableGrid) {
    return null;
  }

  return <div className="GridOverlay"></div>;
}

export default GridOverlay;
