const Prism = require("prismjs");
const loadLanguages = require("prismjs/components/");

loadLanguages(["python"]);

export function getHighlightMarkup(source, lang) {
  let markup;
  try {
    const grammar = Prism.languages[lang];
    markup = Prism.highlight(source, grammar, lang);
  } catch (e) {
    // Do nothing
  }
  return markup;
}
