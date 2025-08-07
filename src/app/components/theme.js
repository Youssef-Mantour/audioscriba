import { createTheme } from '@mui/material/styles';

// Shared options for both themes
const commonOptions = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    subtitle1: { fontSize: '0.875rem', fontWeight: 400 },
    subtitle2: { fontSize: '0.75rem', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  spacing: 8,
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.05)' },
        },
      },
      defaultProps: { disableRipple: true },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.3s ease',
        },
      },
    },
  },
};

// Light Theme with improved contrast colors
export const lightTheme = createTheme({
  ...commonOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#073f0e',         // Dark green (stronger)
      dark: '#054c08',         // Even darker green for icons/buttons
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6fa67a',
      dark: '#567a57',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#555555',
    },
    divider: '#e0e0e0',
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabledBackground: 'rgba(0,0,0,0.12)',
      disabled: 'rgba(0,0,0,0.38)',
    },
  },
});

// Dark Theme with consistent button/icon colors
export const darkTheme = createTheme({
  ...commonOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',         // Soft blue
      dark: '#63a4ff',         // Slightly brighter for icons/buttons
      contrastText: '#121212',
    },
    secondary: {
      main: '#81c784',
      dark: '#519657',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
    divider: '#333333',
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabledBackground: 'rgba(255,255,255,0.12)',
      disabled: 'rgba(255,255,255,0.5)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #333',
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.7)',
        },
      },
    },
  },
});

export const getTheme = (mode) => (mode === 'dark' ? darkTheme : lightTheme);
