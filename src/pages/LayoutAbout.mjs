import * as React from "react";

import LayoutBase from "./LayoutBase.mjs";

function AboutIntro() {
  return (
    <div>
      <p>Hello.</p>
      <p>
        My name is Yanglin and I'm a Software Engineer. I'm a generalist and a
        polyglot interested in how systems connect together.
      </p>

      <p>
        I currently work on Web stuff at Addepar. Previously I've worked at PBS,
        Walmart Labs, and Automatic.
      </p>

      <p>
        I'm currently based in Washington DC. In my free time, I like to tinker
        around on personal software projects, play video games, and hangout with
        my family.
      </p>

      <p>
        If you have any questions, or just want to say hello, drop me a line at
        hi@yanglinzhao.com.
      </p>
    </div>
  );
}

function LayoutAbout(props) {
  return (
    <LayoutBase>
      <AboutIntro />
    </LayoutBase>
  );
}

export default LayoutAbout;
