import * as React from "react";

import LayoutBase from "./LayoutBase.mjs";
import FragmentIndexIntro from './FragmentIndexIntro.mjs';

function LayoutIndex(props) {
  return (
    <LayoutBase>
      <FragmentIndexIntro />
    </LayoutBase>
  );
}

export default LayoutIndex;
