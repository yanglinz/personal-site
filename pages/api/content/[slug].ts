import { getContentAST } from "../../../publishable/blog-engine";

async function handler(req, res) {
  const { slug } = req.query;
  const markdown = "#Hello world!";
  const content = await getContentAST(markdown);

  res.json(content);
}

export default handler;
