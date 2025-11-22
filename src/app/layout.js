"use client";

import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getTheme } from "@/components/theme";

import {
  CssBaseline,
  Container,
  Box,
  ThemeProvider,
  useMediaQuery,
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

  // 💡 Helper: read cookie
  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  // 🚀 Load theme from cookies or fallback
  useEffect(() => {
    const savedCookieTheme = getCookie("theme");

    const initialMode =
      savedCookieTheme === "light" || savedCookieTheme === "dark"
        ? savedCookieTheme
        : prefersDarkMode
        ? "dark"
        : "light";

    setMode(initialMode);

    // Initialize GTM
    const GTM_ID = process.env.NEXT_PUBLIC_TM_ID;
    if (GTM_ID) TagManager.initialize({ gtmId: GTM_ID });
  }, [prefersDarkMode]);

  // 🍪 Save theme in cookies
  useEffect(() => {
    document.cookie = `theme=${mode}; path=/; max-age=31536000; SameSite=Lax`;
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = getTheme(mode);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          transition: "background-color .35s ease, color .35s ease",
          opacity: 0,
          animation: "fadeIn .45s ease forwards",
        }}
      >
        <style>
          {`
            @keyframes fadeIn {
              to { opacity: 1; }
            }
          `}
        </style>

        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Top Navigation */}
          <Navigation toggleColorMode={toggleTheme} mode={mode} />

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
              mt: 4,
              textAlign: "center",
              transition: "background-color .35s ease, color .35s ease",
            }}
          >
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
