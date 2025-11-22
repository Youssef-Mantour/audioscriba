'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const supabase = createClient();

export function Navigation({ toggleColorMode }) {
  const router = useRouter();
  const theme = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const navItems = [
    { label: 'What is it', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/languages-board' },
    //{ label: 'Contact', href: '/contact' },
  ];

  const handleSignIn = () => router.push('/login');

  const sharedButtonStyle = {
    fontSize: '1.3rem',
    textTransform: 'capitalize',
    fontFamily: 'Georgia, Serif',
    color: theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light',
    px: 1.2,
    py: 1.2,
    borderRadius: '10px',
    boxShadow: '0px 6px 12px rgba(3, 9, 4, 0.75)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        pt: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', mx: 1 }}>
        {/* Logo */}
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: '90px', height: '50px', cursor:    'pointer' }}
          />
        </Link>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="black"
          aria-label="menu"
          onClick={() => setMenuOpen(!menuOpen)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Nav Items */}
        <Box
          sx={{
            gap: 2,
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {navItems.map(({ label, href }) => {
            const key = `${label}-${href}`;
            const isDashboard = label === 'Dashboard';
            const disabled = isDashboard && !session;

            const button = (
              <Button
                key={key}
                href={disabled ? undefined : href}
                component={disabled ? 'button' : Link}
                disabled={disabled}
                sx={{
                  ...sharedButtonStyle,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {label}
              </Button>
            );

            return disabled ? (
              <Tooltip key={key} title="Please log in to access the Dashboard">
                <span>{button}</span>
              </Tooltip>
            ) : (
              button
            );
          })}

          {!session && (
            <Button onClick={handleSignIn} sx={sharedButtonStyle}>
              Login
            </Button>
          )}

          {/* Light/Dark Toggle (Desktop) */}
          <IconButton onClick={toggleColorMode} sx={{ ml: 1 }}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Avatar (Desktop Only) */}
          {session?.user?.user_metadata?.avatar_url && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 2 }}>
              <img
                src={session.user.user_metadata.avatar_url}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: '50%' }}
              />
            </Box>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Dropdown */}
      <Collapse
        in={menuOpen}
        sx={{ display: { xs: 'block', md: 'none' }, bgcolor: 'primary.main' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
          {navItems.map(({ label, href }) => {
            const key = `mobile-${label}-${href}`;
            const isDashboard = label === 'Dashboard';
            const disabled = isDashboard && !session;

            const button = (
              <Button
                key={key}
                href={disabled ? undefined : href}
                component={disabled ? 'button' : Link}
                onClick={() => setMenuOpen(false)}
                disabled={disabled}
                sx={{
                  ...sharedButtonStyle,
                  justifyContent: 'flex-start',
                  fontSize: '1.2rem',
                  width: '100%',
                  color: 'white',
                }}
              >
                {label}
              </Button>
            );

            return disabled ? (
              <Tooltip key={key} title="Please log in to access the Dashboard">
                <span>{button}</span>
              </Tooltip>
            ) : (
              button
            );
          })}

          {!session && (
            <Button onClick={handleSignIn} sx={{ ...sharedButtonStyle, color: 'white' }}>
              Login
            </Button>
          )}

          {/* Light/Dark Toggle (Mobile) */}
          <IconButton
            sx={{ mt: 2, color: 'white' }}
            onClick={toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box> 
      </Collapse>
    </AppBar>
  );
}
