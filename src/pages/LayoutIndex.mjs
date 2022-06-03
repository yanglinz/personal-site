import * as React from "react";

import LayoutBase from "./LayoutBase.mjs";
import FragmentIndexIntro from "./FragmentIndexIntro.mjs";
import FragmentPostList from "./FragmentPostList.mjs";

function LayoutIndex(props) {
  return (
    <LayoutBase>
      <FragmentIndexIntro />
      <FragmentPostList posts={props.posts} />
    </LayoutBase>
  );
}

export default LayoutIndex;
