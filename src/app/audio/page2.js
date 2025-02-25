'use client';

import Paper from '@mui/material/Paper';
import { Dancing_Script } from 'next/font/google';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TextField, Button, CircularProgress, Typography, Box, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { ElevenLabsClient } from "elevenlabs";

const voices = ["Michael", "George", "Lewis", "Bella", "Emma", "Nicole", "Sarah", "Isabella", "Sky", "Adam"];
const formats = ["mp3", "opus", "aac", "flac", "pcm", "wav"];
const tinos = Dancing_Script({ subsets: ['latin'], weight: '700' });

const client = new ElevenLabsClient({
  apiKey: "Dz0IFPHdVJ2R16m0ol6Vo28Rp0Qi5Cic",
  environment: "https://api.lemonfox.ai"
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("Sarah");
  const [responseFormat, setResponseFormat] = useState("mp3");
  const [isClient, setIsClient] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const linkContainerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleVoiceChange = (voice) => {
    setSelectedVoice(voice);
  };

  const handleFormatChange = (event) => {
    setResponseFormat(event.target.value);
  };

  const generateAudio = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const audio = await client.textToSpeech.convert(selectedVoice, {
        text: inputText,
        outputFormat: responseFormat
      });
      
      const blob = new Blob([audio], { type: `audio/${responseFormat}` });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      setError("Failed to generate audio.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom className={tinos.className}>
        Text-to-Speech Audio Generator
      </Typography>
      <Typography variant="h6" gutterBottom>
        Select a Voice
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        {voices.map((voice) => (
          <Grid item key={voice} sx={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleVoiceChange(voice)}>
            <Image
              src={`/avatars-voice/${voice}.jpg`}
              alt={voice}
              width={70}
              height={70}
              unoptimized 
              style={{
                borderRadius: "50%",
                border: selectedVoice === voice ? "3px solid #009688" : "none",
                boxShadow: selectedVoice === voice ? "0px 2px 10px #009688" : "0px 2px 10px #616161",
                transition: "all 0.3s ease-in-out",
              }}
            />
            <Typography variant="body2" sx={{ mt: 0 }}>{voice}</Typography>
          </Grid>
        ))}
      </Grid>
      <FormControl sx={{ mb: 3 }}>
        <FormLabel sx={{ fontWeight: "bold", textAlign: "center" }}>
          Select Output Format
        </FormLabel>
        <RadioGroup
          value={responseFormat}
          onChange={handleFormatChange}
          sx={{ justifyContent: "center", display: "flex", flexDirection: "row", gap: 2 }}
        >
          {formats.map((format) => (
            <Box key={format} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Radio value={format} color="primary" />
              <Typography variant="body2">{format.toUpperCase()}</Typography>
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
      <Box ref={linkContainerRef} sx={{ mb: 3 }} />
      <Paper elevation={3}>
        <TextField
          label="Enter text"
          fullWidth
          multiline
          rows={7}
          value={inputText}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mb: 0 }}
        />
      </Paper>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      <Box>
        <Button variant="contained" color="primary" onClick={generateAudio} disabled={loading} sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} /> : "Generate Audio"}
        </Button>
      </Box>
      {audioUrl && (
        <Box sx={{ mt: 3 }}>
          <h2>Audio</h2>
          <audio controls>
            <source src={audioUrl} type={`audio/${responseFormat}`} />
            Your browser does not support the audio element.
          </audio>
          <Button variant="contained" color="secondary" href={audioUrl} download={`speech.${responseFormat}`} sx={{ ml: 2 }}>
            Download
          </Button>
        </Box>
      )}
    </Box>
  );
}
