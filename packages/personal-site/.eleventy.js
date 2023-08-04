const Nunjucks = require("nunjucks");
const datefns = require("date-fns");
const Image = require("@11ty/eleventy-img");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

async function imageShortcode(
  src,
  alt,
  sizes = "(min-width: 30em) 50vw, 100vw"
) {
  let metadata = await Image(src, {
    widths: [480, 780, 1000, 1400, 2200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img",
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  const sources = Object.values(metadata)
    .map((imageFormat) => {
      const type = imageFormat[0].sourceType;
      const srcset = imageFormat.map((entry) => entry.srcset).join(", ");
      return `<source type="${type}" srcset="${srcset}" sizes="${sizes}">`;
    })
    .join("\n");

  return `<div class="s-image" style="aspect-ratio: ${highsrc.width} / ${highsrc.height}">
    <picture>
      ${sources}
      <img
        src="${lowsrc.url}"
        alt="${alt}"
        width="100%"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>`;
}

async function reactComponentShortcode(name, ...args) {
  const renderer = await import("./lib/render.mjs");
  return await renderer.renderComponent(name, args);
}

function serializeCollection(value) {
  function stripped(item) {
    const { data } = item;
    const { eleventy, pkg, page, collections, ...rest } = data;
    return { page, ...rest };
  }

  return value.map(stripped);
}

module.exports = function config(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Nunjucks
  const env = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("src/templates")
  );
  eleventyConfig.setLibrary("njk", env);
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("react", reactComponentShortcode);
  eleventyConfig.addFilter("formattedDate", (dateObj) => {
    return datefns.format(dateObj, "MM/dd/yyyy");
  });

  // React components
  eleventyConfig.addWatchTarget("./src/**/*.mjs");
  eleventyConfig.addFilter("serializeCollection", serializeCollection);

  eleventyConfig.addPassthroughCopy({ "public/*.*": "." });
  return {
    dir: {
      input: "www",
      includes: "../src/templates", // relative to wwww
      output: "_site",
    },
    markdownTemplateEngine: "njk",
  };
};