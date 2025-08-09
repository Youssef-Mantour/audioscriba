import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Button,
  Paper
} from "@mui/material";
import { PlayArrow, Pause, VolumeUp, Download } from "@mui/icons-material";

export default function AudioPlayer({ audioUrl, responseFormat, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [audioRef]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setProgress(newValue);
    }
  };

  const handleVolumeChange = (e, newValue) => {
    if (audioRef.current) {
      audioRef.current.volume = newValue;
      setVolume(newValue);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        maxWidth: 500,
        width: "100%",
      }}
    >
      <audio ref={audioRef} src={audioUrl} type={`audio/${responseFormat}`} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        🎵 Audio Player
      </Typography>

      {/* Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={togglePlay} color="primary" size="large">
          {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
        </IconButton>

        <Slider
          value={progress}
          max={duration || 0}
          onChange={handleSeek}
          sx={{ flex: 1 }}
        />

        <Typography variant="body2" sx={{ minWidth: 50, textAlign: "right" }}>
          {Math.floor(progress / 60)}:
          {String(Math.floor(progress % 60)).padStart(2, "0")}
        </Typography>
      </Box>

      {/* Volume Control */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <VolumeUp sx={{ mr: 1 }} />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          sx={{ flex: 1 }}
        />
      </Box>

      {/* Download Button */}
      <Button
        variant="contained"
        color="secondary"
        href={audioUrl}
        download={`speech.${responseFormat}`}
        startIcon={<Download />}
        sx={{ mt: 2 }}
      >
        Download
      </Button>
    </Paper>
  );
}
