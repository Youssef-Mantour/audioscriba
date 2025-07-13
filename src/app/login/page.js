'use client';
import React from 'react';
import { login, signup, signInWithGoogle } from './actions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

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
          required
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
        />
        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Log in
        </Button>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          Sign up
        </Button>
        <Button
          variant="text"
          color="secondary"
          type="button"
          onClick={() => {
            // If logout is an action URL string, handle accordingly
            window.location.href = '/logout';
          }}
        >
          Log out
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </Stack>
    </Box>
  );
}
