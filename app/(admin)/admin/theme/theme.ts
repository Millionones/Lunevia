'use client';

import { PaletteMode, createTheme } from '@mui/material/styles';

const commonTypography = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
};

const commonComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 10,
        letterSpacing: 0.1,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 18,
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(10px)',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor: 'transparent',
      },
      notchedOutline: {
        borderColor: 'rgba(0,0,0,0.12)',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontWeight: 600,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        background: 'linear-gradient(90deg, rgba(79,70,229,0.08), rgba(16,185,129,0.05))',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontWeight: 700,
        letterSpacing: 0.2,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        marginInline: 6,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: 'rgba(0,0,0,0.08)',
      },
    },
  },
};

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#4f46e5',
      },
      secondary: {
        main: '#10b981',
      },
      background: {
        default: mode === 'light' ? '#f4f6fb' : '#0b1021',
        paper: mode === 'light' ? '#ffffff' : '#111827',
      },
      text: {
        primary: mode === 'light' ? '#0f172a' : '#e5e7eb',
        secondary: mode === 'light' ? '#475569' : '#9ca3af',
      },
    },
    typography: commonTypography,
    shape: { borderRadius: 12 },
    components: commonComponents,
  });
