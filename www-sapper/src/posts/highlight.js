const hljs = require("highlight.js");

export function getHighlightMarkup(source, lang) {
  return hljs.highlightAuto(source).value;
}
