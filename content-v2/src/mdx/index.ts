const unified = require("unified");
const remark = require("remark-parse");
const remarkMdx = require("remark-mdx");
const remarkHtml = require("remark-html");
const rehype = require("rehype-parse");

async function transpile(content) {
  const processor = unified().use(remark);

  // const htmlProcessor = unified().use(rehype);
  // parsed = htmlProcessor.parse("<html />");

  return processor.parse(content);
}

module.exports = { transpile };
