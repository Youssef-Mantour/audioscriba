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

  // Load theme mode & initialize GTM
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    const initialMode =
      savedMode === "light" || savedMode === "dark"
        ? savedMode
        : prefersDarkMode
        ? "dark"
        : "light";

    setMode(initialMode);

    const GTM_ID = process.env.NEXT_PUBLIC_TM_ID;
    if (GTM_ID) TagManager.initialize({ gtmId: GTM_ID });
  }, [prefersDarkMode]);

  // Persist theme mode
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = getTheme(mode);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ transition: "background-color .3s, color .3s" }}
      >
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
              transition: "background-color .3s, color .3s",
            }}
          >
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
