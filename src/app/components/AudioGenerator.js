'use client';

import { useState, useRef } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [responseFormat, setResponseFormat] = useState('mp3');
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const handleInputChange = (e) => setInputText(e.target.value);
  const handleVoiceChange = (v) => setSelectedVoice(v);
  const handleFormatChange = (e) => setResponseFormat(e.target.value);

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
      // 1️⃣ Fetch user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('You must be signed in');

      const userId = session.user.id;
      const characterCount = trimmed.length;

      // 2️⃣ Fetch user's credit balance
      const { data: creditRow, error: creditError } = await supabase
        .from('user_credits')
        .select('total_credits, used_credits')
        .eq('user_id', userId)
        .single();

      if (creditError) throw new Error('Could not fetch user credits: ' + creditError.message);

      const totalCredits = creditRow?.total_credits ?? 0;
      const usedCredits = creditRow?.used_credits ?? 0;
      const availableCredits = totalCredits - usedCredits;

      // 3️⃣ Check if user has enough credits
      if (availableCredits < characterCount) {
        throw new Error(`Insufficient credits. You have ${availableCredits} characters left but your text has ${characterCount}.`);
      }

      // 4️⃣ Generate speech (TTS)
      const res = await fetch('http://localhost:3000/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText: trimmed, selectedVoice, responseFormat, language }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || 'Failed to generate audio');
      }

      // 5️⃣ Create audio blob URL
      const buffer = await res.arrayBuffer();
      const url = URL.createObjectURL(new Blob([buffer], { type: 'audio/mpeg' }));
      setAudioUrl(url);

      // 6️⃣ Update used credits
      const newUsed = usedCredits + characterCount;
      const { error: updateError } = await supabase
        .from('user_credits')
        .update({ used_credits: newUsed, updated_at: new Date().toISOString() })
        .eq('user_id', userId);

      if (updateError) console.error('Failed to update user credits:', updateError.message);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', mt: 5, textAlign: 'center' }}>
      <LanguageBord />
      <Typography variant="h3" gutterBottom className={tinos.className}>
        Text-to-Speech Audio Generator
      </Typography>

      <VoiceSelector selectedVoice={selectedVoice} handleVoiceChange={handleVoiceChange} voices={voices} />
      <FormatSelector responseFormat={responseFormat} handleFormatChange={handleFormatChange} />
      <TextInput inputText={inputText} handleInputChange={handleInputChange} />

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      <Button variant="contained" color="primary" onClick={generateAndPlayAudio} disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : 'Generate Audio'}
      </Button>

      {audioUrl && <AudioPlayer audioUrl={audioUrl} responseFormat={responseFormat} audioRef={audioRef} />}
    </Box>
  );
}
