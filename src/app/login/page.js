'use client';

import { useState } from 'react';
import { login, signup, signInWithGoogle } from './actions';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!form.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // ✅ Convert state into FormData
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('password', form.password);

      await action(formData); // server action still works with formData.get()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        maxWidth: 360,
        mx: 'auto',
        mt: 10,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={2}>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
          fullWidth
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          required
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSubmit(e, login)}
        >
          Log in
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={(e) => handleSubmit(e, signup)}
        >
          Sign up
        </Button>

        <Button
          type="button"
          variant="contained"
          color="secondary"
          startIcon={<GoogleIcon />}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </Stack>
    </Box>
  );
}
