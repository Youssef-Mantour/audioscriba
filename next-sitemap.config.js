const fs = require("fs");
const path = require("path");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://yourdomain.com", // <-- Replace with your domain
  generateRobotsTxt: true,
  sitemapSize: 5000,
  
  // Automatically include all pages from app/
  additionalPaths: async (config) => {
    const appDir = path.join(process.cwd(), "app");

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

    // Example: add dynamic routes from API
    const dynamicPosts = await fetch("https://yourdomain.com/api/posts")
      .then(res => res.json())
      .catch(() => []);

    const dynamicUrls = dynamicPosts.map(post => `/posts/${post.slug}`);

    // Combine static + dynamic pages
    const allPaths = [...staticPages, ...dynamicUrls];

    // Transform into next-sitemap format
    return allPaths.map(page => config.transform(config, page));
  },
};
