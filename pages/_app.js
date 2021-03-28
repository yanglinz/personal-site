import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import fathom from "../src/fathom";
import * as env from "../src/environment";

import "../src/styles/variables.css";
import "../src/styles/index.scss";

Router.events.on("routeChangeComplete", () => {
  fathom("trackPageview");
});

export default function MyApp({ Component, pageProps }) {
  // Initialize Fathom when the app loads
  useEffect(() => {
    fathom("set", "siteId", env.FATHOM_SITE_ID);
    fathom("trackPageview");
  }, []);

  return (
    <>
      <Head></Head>
      <Component {...pageProps} />
    </>
  );
}
