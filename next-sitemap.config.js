const fs = require("fs");
const path = require("path");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://txtvoxai.com", // <-- your domain
  generateRobotsTxt: true,
  sitemapSize: 5000,

  additionalPaths: async (config) => {
    const appDir = path.join(process.cwd(), "src", "app");
    function getPages(dir, parentPath = "") {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      let pages = [];

      for (const entry of entries) {
        if (entry.isDirectory() && !["components", "api"].includes(entry.name)) {
          pages = pages.concat(getPages(path.join(dir, entry.name), `${parentPath}/${entry.name}`));
        } else if (entry.isFile()) {
          if (entry.name === "page.js" || entry.name === "page.tsx") {
            pages.push(parentPath === "" ? "/" : parentPath);
          }
        }
      }

      return pages;
    }

    const staticPages = getPages(appDir);

    // No dynamic routes, just transform static pages
    return staticPages.map(page => config.transform(config, page));
  },
};
