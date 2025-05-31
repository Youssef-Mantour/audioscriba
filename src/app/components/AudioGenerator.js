'use client';

import { useState, useRef } from "react";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import VoiceSelector from "../components/VoiceSelector";
import FormatSelector from "../components/FormatSelector";
import TextInput from "../components/TextInput";
import AudioPlayer from "../components/AudioPlayer";
import { Dancing_Script } from "next/font/google";
import LanguageBord from "@/languages-board/page";

const tinos = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
});

export default function AudioGenerator({ language, voices }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [responseFormat, setResponseFormat] = useState("mp3");
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const handleInputChange = (event) => setInputText(event.target.value);
  const handleVoiceChange = (voice) => setSelectedVoice(voice);
  const handleFormatChange = (event) => setResponseFormat(event.target.value);

  const generateAndPlayAudio = async () => {
    if (!inputText.trim()) return setError("Please enter some text.");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    setLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const res = await fetch('http://localhost:3000/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          selectedVoice,
          responseFormat,
          language,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate audio');
      }

      const arrayBuffer = await res.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 5, textAlign: "center" }}>
      <LanguageBord />
      <Typography variant="h3" gutterBottom className={tinos.className}>
        Text-to-Speech Audio Generator
      </Typography>

      <VoiceSelector selectedVoice={selectedVoice} handleVoiceChange={handleVoiceChange} voices={voices} />
      <FormatSelector responseFormat={responseFormat} handleFormatChange={handleFormatChange} />
      <TextInput inputText={inputText} handleInputChange={handleInputChange} />

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      <Button
        variant="contained"
        color="primary"
        onClick={generateAndPlayAudio}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Generate Audio"}
      </Button>

      {audioUrl && <AudioPlayer audioUrl={audioUrl} responseFormat={responseFormat} audioRef={audioRef} />}
    </Box>
  );
}
