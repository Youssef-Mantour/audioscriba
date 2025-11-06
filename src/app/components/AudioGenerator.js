"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Chip,
  Divider,
  List,
} from "@mui/material";
import VoiceSelector from "../components/VoiceSelector";
import TextInput from "../components/TextInput";
import AudioPlayer from "../components/AudioPlayer";
import LanguageBord from "@/languages-board/page";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function AudioGenerator({ language, voices }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialText = searchParams.get("text") || "";

  const [inputText, setInputText] = useState(initialText);
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  // keep other states like session, credits, audioLinks same as before...

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    // Update URL without full reload
    const currentPath = window.location.pathname;
    router.replace(`${currentPath}?text=${encodeURIComponent(newText)}`, {
      shallow: true,
    });
  };

  const handleVoiceChange = (v) => setSelectedVoice(v);

  // ... rest of generateAndPlayAudio logic stays the same

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", mt: 10 }}>
      <Box sx={{ overflow: "scroll", width: 280, ml: 3, bgcolor: "#155f39ff", color: "#fff", p: 3, display: "flex", flexDirection: "column", borderRight: "1px solid #333", borderRadius: "10px", maxHeight: "calc(100vh - 80px)" }}>
        <Box sx={{ flexGrow: 1, pr: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            🎤 Speech Dashboard
          </Typography>
          <Divider sx={{ borderColor: "#444", mb: 2 }} />
          <List>
            <LanguageBord />
            <Divider sx={{ borderColor: "#444", mb: 2 }} />
            <VoiceSelector selectedVoice={selectedVoice} handleVoiceChange={handleVoiceChange} voices={voices} />
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { /* your generate audio function */ }}
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={20} /> : "Generate Speech"}
          </Button>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", px: 3, py: 4, bgcolor: "#f9f9fb" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
          Text to Speech Generator
        </Typography>

        <TextInput inputText={inputText} handleInputChange={handleInputChange} fullWidth sx={{ width: "100%" }} />

        {audioUrl && (
          <Box sx={{ mt: 3 }}>
            <AudioPlayer audioUrl={audioUrl} audioRef={audioRef} responseFormat="mp3" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
