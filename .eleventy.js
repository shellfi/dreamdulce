module.exports = function (eleventyConfig) {
  // This makes the eleventy command quieter (with less detail)
  eleventyConfig.setQuietMode(true);

  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // This will make Eleventy not use your .gitignore file to ignore files
  eleventyConfig.setUseGitIgnore(false);

  // This defines which files will be copied
  eleventyConfig.setTemplateFormats([
    "html",
    "njk",
    "txt",
    "js",
    "css",
    "xml",
    "json",
  ]);

  
  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("/reviews*.{html,md}").sort((a, b) => {
      return b.date - a.date; // Sort in reverse chronological order (newest first)
    });
  });
  
  // Add date filter for RSS
  eleventyConfig.addFilter("dateToRfc822", function(date) {
    return new Date(date).toUTCString();
  });

  // This defines the input and output directories
  return {
    dir: {
      input: "content",
      output: "public",
    },
  };
}