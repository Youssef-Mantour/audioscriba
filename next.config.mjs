
/** @type {import('next').NextConfig} */
const nextConfig = {
    
    headers: async () => [
      {
        source: "/(.*)",
        domains: ["fonts.gstatic.com"],
        reactStrictMode: true, 
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
          },
        ],
      },
    ],
  };
  
  