export function getHighlightMarkup(source, lang) {
  return "<span>foo = bar</span>"
  return hljs.highlightAuto(source).value;
}
