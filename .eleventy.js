const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // --- Passthrough: static assets ---
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");

  // --- Ignore: files inside assets that 11ty might try to process ---
  eleventyConfig.ignores.add("src/assets/**/*.md");

  // --- Markdown: allow HTML inside .md files ---
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.setLibrary("md", md);

  // --- Collection: team members (sorted by order field) ---
  eleventyConfig.addCollection("trustees", (collectionApi) =>
    collectionApi.getFilteredByTag("trustee").sort((a, b) => a.data.order - b.data.order)
  );
  eleventyConfig.addCollection("teamMembers", (collectionApi) =>
    collectionApi.getFilteredByTag("team-member").sort((a, b) => a.data.order - b.data.order)
  );

  // --- Nunjucks filter: initials from a name ---
  eleventyConfig.addFilter("initials", (name) => {
    if (!name) return "";
    return name
      .replace(/\s*\([^)]*\)\s*/g, " ") // strip parenthesised nicknames
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
