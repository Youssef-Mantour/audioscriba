'use client';
import { login, signup, signInWithGoogle } from './actions';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';   // optional: nice visual cue

export default function LoginPage() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ maxWidth: 360, mx: 'auto', p: 2 }}
    >
      <Stack spacing={2}>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          fullWidth
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          required
          fullWidth
        />

        {/* native form‑actions keep working */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          formAction={login}
        >
          Log in
        </Button>

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          formAction={signup}
        >
          Sign up
        </Button>

        {/* Google OAuth – no form submit, just call the client action */}
        <Button
          type="button"
          variant="contained"
          color="secondary"
          startIcon={<GoogleIcon />}        // remove if you don't want the icon
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </Stack>
    </Box>
  );
}
