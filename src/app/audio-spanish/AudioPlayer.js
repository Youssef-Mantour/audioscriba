// AudioPlayer.js
import { Box, Typography, Button } from "@mui/material";

export default function AudioPlayer({ audioUrl, responseFormat, audioRef }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Audio</Typography>
      <audio ref={audioRef} controls>
        <source src={audioUrl} type={`audio/${responseFormat}`} />
        Your browser does not support the audio element.
      </audio>
      <Button variant="contained" color="secondary" href={audioUrl} download={`speech.${responseFormat}`} sx={{ ml: 2 }}>
        Download
      </Button>
    </Box>
  );
}