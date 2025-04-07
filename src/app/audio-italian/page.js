// AudioGenerator.js
'use client';
import { useState, useRef } from "react";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import VoiceSelector from "./VoiceSelector";
import FormatSelector from "./FormatSelector";
import TextInput from "./TextInput";
import AudioPlayer from "./AudioPlayer";
import { generateAudio } from "./api";
import { Dancing_Script } from "next/font/google";

const tinos = Dancing_Script({
  weight: '700',     // Specify the weight (700 for bold)
  subsets: ['latin'], // Specify the subsets you want
});

export default function AudioGenerator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("sara");
  const [responseFormat, setResponseFormat] = useState("mp3");
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const handleInputChange = (event) => setInputText(event.target.value);
  const handleVoiceChange = (voice) => setSelectedVoice(voice);
  const handleFormatChange = (event) => setResponseFormat(event.target.value);

  const generateAndPlayAudio = async () => {
    if (!inputText.trim()) return setError("Please enter some text.");
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    setLoading(true); setError(null); setAudioUrl(null);
    try {
      const url = await generateAudio(inputText, selectedVoice, responseFormat);
      setAudioUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom className={tinos.className}>Text-to-Speech Audio Generator</Typography>
      <VoiceSelector selectedVoice={selectedVoice} handleVoiceChange={handleVoiceChange} />
      <FormatSelector responseFormat={responseFormat} handleFormatChange={handleFormatChange} />
      <TextInput inputText={inputText} handleInputChange={handleInputChange} />
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      <Button variant="contained" color="primary" onClick={generateAndPlayAudio} disabled={loading} sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : "Generate Audio"}
      </Button>
      {audioUrl && <AudioPlayer audioUrl={audioUrl} responseFormat={responseFormat} audioRef={audioRef} />}
    </Box>
  );
}
