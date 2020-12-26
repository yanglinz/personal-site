import Layout from "./_layout";

type TODO = any;

const postId = "utils-antipattern";

export async function getStaticProps() {
  const data = await import("./_data");
  return await data.getStaticProps(postId);
}

export default function Page(props: TODO) {
  const { content, metadata } = props;
  return <Layout content={content} metadata={metadata} />;
}
