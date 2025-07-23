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
import Chip from '@mui/material/Chip';

// Supabase client (browser‑side)
const supabase = createClient();

export function Navigation() {
  const router = useRouter();

  // ── state ───────────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [credits, setCredits] = useState(null); // null = guest

  // ── auth + credit fetch ────────────────────────────────
  useEffect(() => {
    // Pull balance for current user
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

    // Initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session?.user) fetchCredits(data.session.user.id);
    });

    // Listen for sign‑in/out
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

    // Cleanup
    return () => listener.subscription.unsubscribe();
  }, []);

  // ── nav items ──────────────────────────────────────────
  const navItems = [
    { label: 'Use Cases', href: '/usecases' },
    { label: 'Pricing', href: '/' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Dashboard', href: '/languages-board' },
  ];

  // ── auth handlers ─────────────────────────────────────
  const handleSignIn = () => router.push('/login');
  const handleSignOut = () => {
    supabase.auth.signOut();
    router.push('/');
  };

  const AuthButton = () =>
    session ? (
      <Button
        onClick={handleSignOut}
        color="inherit"
        sx={{
          fontSize: '1.5rem',
          textTransform: 'capitalize',
          fontFamily: 'Georgia, Serif',
        }}
      >
        Logout
      </Button>
    ) : (
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

  // ── render ─────────────────────────────────────────────
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between', mx: 1 }}>
        {/* Brand */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
        >
          <Link href="/" style={{ fontSize: '1.5rem' }}>
            AudioScriba
          </Link>
        </Typography>

        {/* Burger (mobile) */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setMenuOpen(!menuOpen)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navItems.map(({ label, href }) => (
            <Button
              key={href}
              href={href}
              component={Link}
              color="inherit"
              sx={{
                fontSize: '1.5rem',
                textTransform: 'capitalize',
                fontFamily: 'Georgia, Serif',
              }}
            >
              {label}
            </Button>
          ))}

          
          <AuthButton />
        </Box>

        {/* Avatar & name */}
        {session?.user && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {session.user.user_metadata.full_name || session.user.email}
            </Typography>
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

      {/* Mobile dropdown */}
      <Collapse
        in={menuOpen}
        sx={{ display: { xs: 'block', md: 'none' }, bgcolor: 'primary.main' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
          {navItems.map(({ label, href }) => (
            <Button
              key={href}
              href={href}
              component={Link}
              color="inherit"
              onClick={() => setMenuOpen(false)}
              sx={{ justifyContent: 'flex-start', fontSize: '1.2rem' }}
            >
              {label}
            </Button>
          ))}

          

          <AuthButton />
        </Box>
      </Collapse>
    </AppBar>
  );
}
