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

const supabase = createClient();

export function Navigation() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchCredits = async (userId) => {
      const { data, error } = await supabase
        .from('user_credits')
        .select('total_credits, used_credits')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        setCredits((data.total_credits ?? 0) - (data.used_credits ?? 0));
      } else {
        setCredits(null);
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) fetchCredits(data.session.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          fetchCredits(newSession.user.id);
        } else {
          setCredits(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const navItems = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'What is it', href: '/' },
    { label: 'Dashboard', href: '/languages-board' },
  ];

  const handleSignIn = () => router.push('/login');

  const AuthButton = () =>
    !session && (
      <Button
        onClick={handleSignIn}
        color="inherit"
        sx={{
          fontSize: '1.5rem',
          textTransform: 'capitalize',
          fontFamily: 'Georgia, Serif',
        }}
      >
        Login
      </Button>
    );

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between', mx: 1 }}>
        {/* Logo */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
        >
          <Link href="/" style={{ fontSize: '1.5rem' }}>
            TxtVoxAI
          </Link>
        </Typography>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setMenuOpen(!menuOpen)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Nav + Login */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Centered Nav Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map(({ label, href }) => {
              const key = `${label}-${href}`;
              const isDashboard = label === 'Dashboard';
              const disabled = isDashboard && !session;

              const button = (
                <Button
                  key={key}
                  href={disabled ? undefined : href}
                  component={disabled ? 'button' : Link}
                  color="inherit"
                  disabled={disabled}
                  sx={{
                    fontSize: '1.5rem',
                    textTransform: 'capitalize',
                    fontFamily: 'Georgia, Serif',
                    cursor: disabled ? 'default' : 'pointer',
                    color: disabled ? 'gray' : 'inherit',
                    pointerEvents: disabled ? 'none' : 'auto',
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
          </Box>

          {/* Login Button aligned right */}
          <Box sx={{ position: 'absolute', right: 0 }}>
            <AuthButton />
          </Box>
        </Box>

        {/* Avatar */}
        {session?.user && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {/* <Typography variant="body2" sx={{ mr: 1 }}>
              {session.user.user_metadata.full_name || session.user.email}
            </Typography> */}
            {session.user.user_metadata.avatar_url && (
              <img
                src={session.user.user_metadata.avatar_url}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: '50%' }}
              />
            )}
          </Box>
        )}
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
                color="inherit"
                onClick={() => setMenuOpen(false)}
                disabled={disabled}
                sx={{
                  justifyContent: 'flex-start',
                  fontSize: '1.2rem',
                  cursor: disabled ? 'default' : 'pointer',
                  color: disabled ? 'gray' : 'inherit',
                  pointerEvents: disabled ? 'none' : 'auto',
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
          <AuthButton />
        </Box>
      </Collapse>
    </AppBar>
  );
}
