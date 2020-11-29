function handler(req, res) {
  const { slug } = req.query;

  console.log(slug);

  // Based on the slug, get the AST

  res.end("Hello world");
}

export default handler;
