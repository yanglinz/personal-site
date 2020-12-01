import { getPostList, getPostDetail } from "../../../publishable/blog-engine";



async function handler(req, res) {
  const { slug } = req.query;
  const postList = await getPostList();
  const post = postList.filter((p) => p.slug === slug)[0];
  if (post) {
    const postDetail = await getPostDetail(slug);
    res.json(postDetail);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.json({});
  }
}

export default handler;
