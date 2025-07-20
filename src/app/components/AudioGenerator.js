'use client';

import { useEffect, useState, useRef } from 'react';
import { Button, CircularProgress, Typography, Box, Chip } from '@mui/material';
import VoiceSelector from '../components/VoiceSelector';
import FormatSelector from '../components/FormatSelector';
import TextInput from '../components/TextInput';
import AudioPlayer from '../components/AudioPlayer';
import LanguageBord from '@/languages-board/page';
import { Dancing_Script } from 'next/font/google';
import { createClient } from '@/utils/supabase/client';

const tinos = Dancing_Script({ weight: '700', subsets: ['latin'] });
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

  // 🔁 Fetch user's previous audio links
  const fetchAudioLinks = async (userId) => {
    const { data, error } = await supabase
      .from('user_audios')
      .select('url')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAudioLinks(data.map((d) => d.url));
    } else {
      console.error('Error fetching audio links:', error);
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
    window.location.reload();
  };

  const handleInputChange = (e) => setInputText(e.target.value);
  const handleVoiceChange = (v) => setSelectedVoice(v);
  const handleFormatChange = (e) => setResponseFormat(e.target.value);

  // Upload audio and get signed URL (valid 1 hour)
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

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('audios')
      .createSignedUrl(filePath, 60 * 60); // URL valid for 1 hour

    if (signedUrlError) {
      console.error('Signed URL error:', signedUrlError);
      return null;
    }

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

      if (creditError) throw new Error('Could not fetch user credits: ' + creditError.message);

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
        await supabase
          .from('user_audios')
          .insert([{ user_id: userId, url: signedUrl }]);

        setAudioLinks((prev) => [signedUrl, ...prev]);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '250px',
          bgcolor: '#f5f5f5',
          p: 2,
          borderRight: '1px solid #ddd',
          m: 2,
          overflowY: 'auto',
          maxHeight: '90vh',
        }}
      >
        <Typography variant="h6" gutterBottom>Welcome</Typography>

        {user ? (
          <>
            <Typography variant="body2" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>

            {user.user_metadata?.full_name && (
              <Typography variant="body2" gutterBottom>
                <strong>Name:</strong> {user.user_metadata.full_name}
              </Typography>
            )}

            {credits !== null ? (
              <Box>
                <Typography variant="body2" gutterBottom>
                  <strong>Credits:</strong>
                </Typography>
                <Chip
                  label={`💎 ${credits}`}
                  color="secondary"
                  sx={{ my: 0, display: "inline" }}
                />
              </Box>
            ) : (
              <Typography variant="body2" gutterBottom>
                <strong>Credits:</strong> Loading...
              </Typography>
            )}

            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>

            {/* Render audio links */}
            {audioLinks.length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 3 }}>
                  🎵 Your Audios
                </Typography>
                {audioLinks.map((url, i) => (
                  <Box key={i} sx={{ my: 1 }}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Audio {i + 1}
                    </a>
                  </Box>
                ))}
              </>
            )}
          </>
        ) : (
          <Typography variant="body2">Not signed in</Typography>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1960, mx: 'auto', mt: 5, textAlign: 'center' }}>
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // ✅ horizontally center
    gap: 2, // spacing between items
    mt: 2,
  }}
>
  <LanguageBord />
  <Button
    variant="contained"
    color="primary"
    onClick={generateAndPlayAudio}
    disabled={loading}
  >
    {loading ? <CircularProgress size={24} /> : 'Generate Audio'}
  </Button>
</Box>

        <Typography variant="h3" gutterBottom className={tinos.className}>
          Text-to-Speech Audio Generator
        </Typography>

        <VoiceSelector selectedVoice={selectedVoice} handleVoiceChange={handleVoiceChange} voices={voices} />
        <FormatSelector responseFormat={responseFormat} handleFormatChange={handleFormatChange} />
        <TextInput inputText={inputText} handleInputChange={handleInputChange} />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        

        {audioUrl && (
          <AudioPlayer
            audioUrl={audioUrl}
            responseFormat={responseFormat}
            audioRef={audioRef}
          />
        )}
      </Box>
    </Box>
  );
}
