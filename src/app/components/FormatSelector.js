// FormatSelector.js
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const formats = ["mp3", "opus", "aac", "flac", "pcm", "wav"];

export default function FormatSelector({ responseFormat, handleFormatChange }) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="format-selector-label">Select Format</InputLabel>
      <Select
        labelId="format-selector-label"
        value={responseFormat}
        label="Select Format"
        onChange={(e) => handleFormatChange(e.target.value)}
      >
        {formats.map((format) => (
          <MenuItem key={format} value={format}>
            <Typography variant="body2">{format.toUpperCase()}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
