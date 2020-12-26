import Head from "next/head";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Post from "../Post/Post";
import ContentHTML from "../../../publishable/blog-engine/components/ContentHTML";

type TODO = any;

export default function Layout(props: TODO) {
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

        <Post post={metadata}>
          <ContentHTML htmlAst={content.ast} />
        </Post>
      </div>
      <Footer />
    </div>
  );
}
