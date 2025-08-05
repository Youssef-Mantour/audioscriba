import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#287045',
        light: '#4ea469',
        dark: '#1e5032',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#719FAF',
        light: '#a0c5d2',
        dark: '#4f7380',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f7fdf9' : '#101d1a',
        paper: mode === 'light' ? '#ffffff' : '#1a2c27',
      },
      text: {
        primary: mode === 'light' ? '#1a1a1a' : '#ffffff',
        secondary: mode === 'light' ? '#444' : '#cccccc',
      },
      divider: mode === 'light' ? '#e0e0e0' : '#2a4039',
    },

    typography: {
      fontFamily: `'Geist Sans', 'Inter', 'Segoe UI', sans-serif`,
      fontSize: 14,
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 10,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });
