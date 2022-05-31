import * as React from "react";

import SharedHeader from "./SharedHeader.mjs";
import SharedFooter from "./SharedFooter.mjs";

function Head() {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/site.webmanifest" rel="manifest" />
      <meta name="theme-color" content="#84cc16" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />

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
      <SharedHeader />
      {props.children}
      <SharedFooter />
    </body>
  );
}

function LayoutBase(props) {
  return (
    <html lang="en">
      <Head />
      <Body>{props.children}</Body>
    </html>
  );
}

export default LayoutBase;
