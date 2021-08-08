const Prism = require("prismjs");
const loadLanguages = require("prismjs/components/");

loadLanguages(["js", "python", "rust", "yaml"]);

export function getHighlightMarkup(source: string, lang: string): string {
  let markup;
  try {
    const grammar = Prism.languages[lang];
    markup = Prism.highlight(source, grammar, lang);
  } catch (e) {
    // Do nothing
  }
  return markup;
}
