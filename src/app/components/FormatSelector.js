// FormatSelector.js
import { RadioGroup, FormControl, FormLabel, Radio, FormControlLabel } from "@mui/material";

export const formats = ["mp3", "opus", "aac", "flac", "pcm", "wav"];
export default function FormatSelector({ responseFormat, handleFormatChange }) {
  return (
    <FormControl sx={{ mb: 3 }}>
      
      <RadioGroup value={responseFormat} onChange={handleFormatChange} row>
        {formats.map((format) => (
          <FormControlLabel key={format} value={format} control={<Radio />} label={format.toUpperCase()} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
