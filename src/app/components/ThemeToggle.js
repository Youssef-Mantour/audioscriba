
'use client';

import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function ThemeToggle({ mode, toggleTheme, sx }) {
  return (
    <IconButton
      onClick={toggleTheme}
      sx={{ display: 'inline' , position: 'fixed', mt: 10, ...sx }}
      color="inherit"
    >
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}

