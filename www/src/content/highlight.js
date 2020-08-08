const Prism = require("prismjs");
const loadLanguages = require("prismjs/components/");

loadLanguages(["python", "yaml"]);

export function getHighlightMarkup(source, lang) {
  if (lang == "text") {
    // TODO: Figure out a permanent  solution for YAML
    lang = "yaml";
  }

  let markup;
  try {
    const grammar = Prism.languages[lang];
    markup = Prism.highlight(source, grammar, lang);
  } catch (e) {
    // Do nothing
  }
  return markup;
}
