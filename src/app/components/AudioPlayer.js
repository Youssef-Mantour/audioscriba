import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Slider,
  Button,
  Paper,
  Typography
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
        p: 1.5,
        borderRadius: 3,
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: 800
      }}
    >
      <audio ref={audioRef} src={audioUrl} type={`audio/${responseFormat}`} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Play/Pause */}
        <IconButton onClick={togglePlay} color="primary">
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>

        {/* Progress Bar */}
        <Slider
          value={progress}
          max={duration || 0}
          onChange={handleSeek}
          sx={{ flex: 1, minWidth: 120 }}
        />

        {/* Time */}
        <Typography variant="body2" sx={{ minWidth: 45, textAlign: "center" }}>
          {Math.floor(progress / 60)}:
          {String(Math.floor(progress % 60)).padStart(2, "0")}
        </Typography>

        {/* Volume */}
        <VolumeUp fontSize="small" />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
          sx={{ width: 80 }}
        />

        {/* Download */}
        <Button
          variant="contained"
          color="secondary"
          href={audioUrl}
          download={`speech.${responseFormat}`}
          startIcon={<Download />}
          size="small"
          sx={{ ml: 1, textTransform: "none" }}
        >
          Download
        </Button>
      </Box>
    </Paper>
  );
}
