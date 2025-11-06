// app/head.tsx
export default function Head() {
  return (
    <>
      {/* ✅ Basic SEO Meta */}
      <title>My SaaS App | Best AI Tool</title>
      <meta
        name="description"
        content="This is my SaaS app that helps you do X, Y, and Z."
      />

      {/* ✅ Social Sharing (OG Tags) */}
      <meta property="og:title" content="My SaaS App | Best AI Tool" />
      <meta
        property="og:description"
        content="This is my SaaS app that helps you do X, Y, and Z."
      />
      <meta property="og:image" content="/seo-image.png" />
      <meta property="og:type" content="website" />

      {/* ✅ Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="My SaaS App | Best AI Tool" />
      <meta
        name="twitter:description"
        content="This is my SaaS app that helps you do X, Y, and Z."
      />
      <meta name="twitter:image" content="/seo-image.png" />

      {/* ✅ Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
