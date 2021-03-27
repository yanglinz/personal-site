import React from "react";

import styles from "./VerticalRhythm.module.css";

interface ComponentProps {
  children: React.ReactChild | React.ReactChild[];
}

function VerticalRhythm(props: ComponentProps) {
  // We're gonna assume a 20px base font size and 1.6x line height
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>{/* placeholder */}</div>
      <>{props.children}</>
    </div>
  );
}

export default VerticalRhythm;
