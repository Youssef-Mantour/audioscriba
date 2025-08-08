// VoiceSelector.js
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export default function VoiceSelector({ selectedVoice, handleVoiceChange, voices }) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="voice-selector-label">Select Voice</InputLabel>
      <Select
        labelId="voice-selector-label"
        value={selectedVoice}
        label="Select Voice"
        onChange={(e) => handleVoiceChange(e.target.value)}
      >
        {voices.map((voice) => (
          <MenuItem key={voice} value={voice}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={`/avatars-voice/${voice}.jpg`}
                alt={voice}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Typography variant="body2">{voice}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
