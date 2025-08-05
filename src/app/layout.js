'use client';

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getTheme } from '@/components/theme';

import {
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// Load Google Fonts
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }) {
  const theme = getTheme('light'); // fixed to 'light' mode

  useEffect(() => {
    const GTM_ID = process.env.NEXT_PUBLIC_TM_ID;
    if (GTM_ID) {
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* AppBar */}
          <AppBar position="static" color="primary">
            <Toolbar>
              

              <Navigation />
              {/* Theme toggle removed */}
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container maxWidth="lg" sx={{ mt: 2, minHeight: '80vh' }}>
            {children}
          </Container>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              py: 2,
              textAlign: 'center',
              mt: 4,
            }}
          >
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
