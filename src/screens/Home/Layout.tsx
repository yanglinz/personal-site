import React from "react";
import Head from "next/head";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface ComponentProps {
  children: React.ReactNode;
}

export default function Layout(props: ComponentProps) {
  const description =
    "I'm a software engineer and I make things that run in browsers. Come check out my thoughts on programming and technology.";
  return (
    <div className="Layout">
      <Head>
        <title>Yanglin Zhao</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <div className="Layout-content">{props.children}</div>
      <Footer />
    </div>
  );
}
