import { createTheme, type Theme } from '@mui/material/styles'

export const macosTheme: Theme = createTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF', // macOS blue
    },
    background: {
      default: '#F5F5F7', // macOS light gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#86868B',
    },
  },
  shape: {
    borderRadius: 8, // macOS rounded corners
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12)',
    '0 2px 6px rgba(0,0,0,0.12)',
    '0 3px 8px rgba(0,0,0,0.12)',
    '0 4px 10px rgba(0,0,0,0.12)',
    '0 5px 12px rgba(0,0,0,0.12)',
    '0 6px 14px rgba(0,0,0,0.12)',
    '0 7px 16px rgba(0,0,0,0.12)',
    '0 8px 18px rgba(0,0,0,0.12)',
    '0 9px 20px rgba(0,0,0,0.12)',
    '0 10px 22px rgba(0,0,0,0.12)',
    '0 11px 24px rgba(0,0,0,0.12)',
    '0 12px 26px rgba(0,0,0,0.12)',
    '0 13px 28px rgba(0,0,0,0.12)',
    '0 14px 30px rgba(0,0,0,0.12)',
    '0 15px 32px rgba(0,0,0,0.12)',
    '0 16px 34px rgba(0,0,0,0.12)',
    '0 17px 36px rgba(0,0,0,0.12)',
    '0 18px 38px rgba(0,0,0,0.12)',
    '0 19px 40px rgba(0,0,0,0.12)',
    '0 20px 42px rgba(0,0,0,0.12)',
    '0 21px 44px rgba(0,0,0,0.12)',
    '0 22px 46px rgba(0,0,0,0.12)',
    '0 23px 48px rgba(0,0,0,0.12)',
    '0 24px 50px rgba(0,0,0,0.12)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No ALL CAPS
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
})
