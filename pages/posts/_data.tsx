export async function getStaticProps(postId: string) {
  const manifest = await import("../../publishable/blog-engine/manifest");
  const content = await manifest.getPostContent(postId, "index.md");
  const metadata = await manifest.getPostMetadata(postId);
  return { props: { metadata, content } };
}
