import React, { useEffect } from "react";
import Router from "next/router";
import * as Fathom from "fathom-client";
import * as env from "../src/environment";

import "../src/styles/index.scss";

Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

export default function MyApp({ Component, pageProps }) {
  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load(env.FATHOM_SITE_ID, {
      url: "//beacon.yanglinzhao.com/tracker.js",
      includedDomains: ["yanglinzhao.com"],
    });
  }, []);

  return <Component {...pageProps} />;
}
