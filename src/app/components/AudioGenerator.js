'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import VoiceSelector from '../components/VoiceSelector';
import FormatSelector from '../components/FormatSelector';
import TextInput from '../components/TextInput';
import AudioPlayer from '../components/AudioPlayer';
import LanguageBord from '@/languages-board/page';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function AudioGenerator({ language, voices }) {
  const [session, setSession] = useState(null);
  const [credits, setCredits] = useState(null);
  const [audioLinks, setAudioLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [responseFormat, setResponseFormat] = useState('mp3');
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const user = session?.user;

  const fetchAudioLinks = async (userId) => {
    const { data, error } = await supabase
      .from('user_audios')
      .select('url')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAudioLinks(data.map((d) => d.url));
    }
  };

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
      if (data.session?.user) {
        const userId = data.session.user.id;
        fetchCredits(userId);
        fetchAudioLinks(userId);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        const userId = newSession.user.id;
        fetchCredits(userId);
        fetchAudioLinks(userId);
      } else {
        setCredits(null);
        setAudioLinks([]);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const handleInputChange = (e) => setInputText(e.target.value);
  const handleVoiceChange = (v) => setSelectedVoice(v);
  const handleFormatChange = (e) => setResponseFormat(e.target.value);

  const uploadAudioToSupabase = async (audioBlob, userId) => {
    const fileName = `audio-${Date.now()}.${responseFormat}`;
    const filePath = `${userId}/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from('audios')
      .upload(filePath, audioBlob, {
        cacheControl: '3600',
        upsert: true,
        contentType: `audio/${responseFormat}`,
      });
    if (uploadError) return null;

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('audios')
      .createSignedUrl(filePath, 60 * 60);
    if (signedUrlError) return null;
    return signedUrlData?.signedUrl ?? null;
  };

  const generateAndPlayAudio = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return setError('Please enter some text.');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('You must be signed in');
      const userId = session.user.id;
      const characterCount = trimmed.length;

      const { data: creditRow, error: creditError } = await supabase
        .from('user_credits')
        .select('total_credits, used_credits')
        .eq('user_id', userId)
        .single();
      if (creditError) throw new Error('Could not fetch user credits');

      const totalCredits = creditRow?.total_credits ?? 0;
      const usedCredits = creditRow?.used_credits ?? 0;
      const availableCredits = totalCredits - usedCredits;
      if (availableCredits < characterCount) {
        throw new Error(`Insufficient credits. You have ${availableCredits} characters left but your text has ${characterCount}.`);
      }

      const res = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText: trimmed, selectedVoice, responseFormat, language }),
      });
      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || 'Failed to generate audio');
      }

      const buffer = await res.arrayBuffer();
      const audioBlob = new Blob([buffer], { type: `audio/${responseFormat}` });
      const localUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(localUrl);

      const newUsed = usedCredits + characterCount;
      await supabase
        .from('user_credits')
        .update({ used_credits: newUsed, updated_at: new Date().toISOString() })
        .eq('user_id', userId);

      const signedUrl = await uploadAudioToSupabase(audioBlob, userId);
      if (signedUrl) {
        await supabase.from('user_audios').insert([{ user_id: userId, url: signedUrl }]);
        setAudioLinks((prev) => [signedUrl, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%',mt:10 }}>
      
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          ml: 3,
          bgcolor: '#1e1e2f',
          color: '#fff',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #333',
          height: '100vh',       // Full viewport height
          overflowY: 'auto',     // Independent scrolling
          borderRadius: '10px 10px 10px 10px', // Rounded corners
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          🎤 Speech Dashboard
        </Typography>
        <Divider sx={{ borderColor: '#444', mb: 2 }} />

        {user ? (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {user.email}
            </Typography>
            <Chip
              label={`💎 ${credits !== null ? credits : 'Loading...'}`}
              color="secondary"
              sx={{ mb: 2 }}
            />
            <Divider sx={{ borderColor: '#444', mb: 2 }} />
<Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              fullWidth
              sx={{ mt: 1, color: '#fff', borderColor: '#ff4d4d' }}
            >
              Logout
            </Button>
            <Divider sx={{ borderColor: '#444', mb: 2 }} />
            <List>
              {/* <ListItem disablePadding>
                <ListItemText primary="Languages" />
              </ListItem> */}
              <LanguageBord />
              <Divider sx={{ borderColor: '#444', mb: 2 }} />
              {/* <ListItem disablePadding>
                <ListItemText primary="Voice" />
              </ListItem> */}
              <VoiceSelector
                selectedVoice={selectedVoice}
                handleVoiceChange={handleVoiceChange}
                voices={voices}
              />
              <Divider sx={{ borderColor: '#444', mb: 2 }} />
              {/* <ListItem disablePadding>
                <ListItemText primary="Format" />
              </ListItem> */}
              {/* <FormatSelector
                responseFormat={responseFormat}
                handleFormatChange={handleFormatChange}
              /> */}
            </List>

            <Button
              variant="contained"
              color="primary"
              onClick={generateAndPlayAudio}
              disabled={loading}
              fullWidth
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={20} /> : 'Generate Speech'}
            </Button>

            <Divider sx={{ borderColor: '#444', mb: 2 }} />

            {audioLinks.length > 0 && (
  <Box sx={{ mt: 3 }}>
    <Typography variant="subtitle2" gutterBottom>
      🎵 My speeches
    </Typography>
    <Box
      sx={{
        maxHeight: 200, // adjust height as needed
        overflowY: 'auto',
        pr: 1, // padding right to avoid scrollbar overlap
      }}
    >
      {audioLinks.length > 0 && (
  <Box sx={{ mt: 1 }}>
    
    <Box
      sx={{
        maxHeight: 200,  // container height shows about 5 items
       // overflowY: 'auto',
        pr: 1,  // padding right for scrollbar space
      }}
    >
      {audioLinks.map((url, i) => (
        <Box key={i} sx={{ my: 1 }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4dabf7' }}
          >
            Speech {i + 1}
          </a>
        </Box>
      ))}
    </Box>
  </Box>
)}

    </Box>
  </Box>
)}

          </>
        ) : (
          <Typography variant="body2">Not signed in</Typography>
        )}
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 3,
          py: 4,
          bgcolor: '#f9f9fb',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            color: '#333',
          }}
        >
          Text to Speech Generator
        </Typography>

        <TextInput
          inputText={inputText}
          handleInputChange={handleInputChange}
          fullWidth
          sx={{ width: '100%' }}
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {audioUrl && (
          <Box sx={{ mt: 3 }}>
            <AudioPlayer
              audioUrl={audioUrl}
              responseFormat={responseFormat}
              audioRef={audioRef}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
