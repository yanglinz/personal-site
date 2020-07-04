const hljs = require("highlight.js");
const Prism = require("prismjs");

export function getHighlightMarkup(source, lang) {
  const grammar = Prism.languages[lang];
  return Prism.highlight(source, grammar, lang);
}
