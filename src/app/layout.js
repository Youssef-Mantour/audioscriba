"use client";

import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getTheme } from "@/components/theme";

import Head from "next/head"; // ✅ add Head for SEO
import {
  CssBaseline,
  Container,
  Box,
  useMediaQuery,
  ThemeProvider,
} from "@mui/material";

// Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState("light");

  // Initialize theme mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    } else {
      setMode(prefersDarkMode ? "dark" : "light");
    }

    const GTM_ID = process.env.NEXT_PUBLIC_TM_ID;
    if (GTM_ID) {
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, [prefersDarkMode]);

  // Update localStorage when theme mode changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = getTheme(mode);

  return (
    <html lang="en">
      <Head>
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
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Navigation with toggle */}
          <Box>
            <Navigation toggleColorMode={toggleTheme} mode={mode} />
          </Box>

          {/* Main Content */}
          <Container maxWidth="lg" sx={{ mt: 2, minHeight: "80vh" }}>
            {children}
          </Container>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              py: 2,
              textAlign: "center",
              mt: 4,
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
