import * as React from "react";

import SharedHeader from "./SharedHeader.mjs";
import SharedHeaderOld from "./SharedHeaderOld.mjs";
import SharedFooter from "./SharedFooter.mjs";

function Head(props) {
  const { extraHead } = props;
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/site.webmanifest" rel="manifest" />
      <meta name="theme-color" content="#84cc16" />

      {extraHead}

      <link href="/main.css" rel="stylesheet" />
      <script
        defer
        data-domain="yanglinzhao.com"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </head>
  );
}

function Body(props) {
  return (
    <body>
      {true ? <SharedHeaderOld /> : <SharedHeader />}
      {props.children}
      <SharedFooter />
    </body>
  );
}

function LayoutBase(props) {
  const { extraHead } = props;
  return (
    <html lang="en">
      <Head extraHead={extraHead} />
      <Body>{props.children}</Body>
    </html>
  );
}

export default LayoutBase;
