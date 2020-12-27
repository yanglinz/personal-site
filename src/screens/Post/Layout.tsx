import React from "react";
import Head from "next/head";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {
  PostMetadata,
  PostContent,
} from "../../../publishable/blog-engine/manifest";
import Post from "../Post/Post";
import ContentHTML from "../../../publishable/blog-engine/components/ContentHTML";

interface ComponentProps {
  content: PostContent;
  metadata: PostMetadata;
  children?: React.ReactNode;
}

export default function Layout(props: ComponentProps) {
  const { content, metadata } = props;
  return (
    <div className="Layout">
      <Head>
        <title>{metadata.title} | Yanglin Zhao</title>
        {metadata.description ? (
          <meta name="description" content={metadata.description} />
        ) : null}
      </Head>
      <Header />
      <div className="Layout-content">
        {props.children}

        <Post metadata={metadata}>
          <ContentHTML htmlAst={content.ast} />
        </Post>
      </div>
      <Footer />
    </div>
  );
}
