import React from "react";
import Head from "next/head";
import Image from "next/image";

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
  const featuredImage = metadata.featuredImage || "";
  const featuredImageAlt = metadata.featuredImageAlt;
  const featuredImageMetadata = content.images[featuredImage];

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
        {featuredImage && featuredImageMetadata ? (
          <Image
            src={featuredImage}
            alt={featuredImageAlt}
            layout="responsive"
            width={featuredImageMetadata.width}
            height={featuredImageMetadata.height}
          />
        ) : null}

        {props.children}

        <Post metadata={metadata}>
          <ContentHTML content={content} />
        </Post>
      </div>
      <Footer />
    </div>
  );
}
