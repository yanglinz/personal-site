import * as React from "react";

import LayoutBase from "./LayoutBase.mjs";
import FragmentIndexIntro from "./FragmentIndexIntro.mjs";
import FragmentPostList from "./FragmentPostList.mjs";

function Head() {
  return (
    <>
      <title>Yanglin Zhao</title>
      <meta
        name="description"
        content="I'm a software engineer and I make things that run in browsers. Come check out my thoughts on programming and technology."
      />
      <link
        href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css"
        rel="stylesheet"
      />

      <meta property="og:title" content="Yanglin Zhao" />
      <meta
        property="og:type"
        content="I'm a software engineer and I make things that run in browsers. Come check out my thoughts on programming and technology."
      />
      <meta property="og:url" content="https://yanglinzhao.com/" />
      <meta property="og:image" content="" />
    </>
  );
}

function LayoutIndex(props) {
  return (
    <LayoutBase extraHead={<Head />}>
      <FragmentIndexIntro />
      <FragmentPostList posts={props.posts} />
    </LayoutBase>
  );
}

export default LayoutIndex;
