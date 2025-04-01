// FormatSelector.js
import { RadioGroup, FormControl, FormLabel, Radio, FormControlLabel } from "@mui/material";
import { formats } from "./constants";

export default function FormatSelector({ responseFormat, handleFormatChange }) {
  return (
    <FormControl sx={{ mb: 3 }}>
      <FormLabel sx={{ fontWeight: "bold", textAlign: "center" }}>Select Output Format</FormLabel>
      <RadioGroup value={responseFormat} onChange={handleFormatChange} row>
        {formats.map((format) => (
          <FormControlLabel key={format} value={format} control={<Radio />} label={format.toUpperCase()} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
