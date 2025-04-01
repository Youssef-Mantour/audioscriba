// TextInput.js
import { TextField, Paper } from "@mui/material";

export default function TextInput({ inputText, handleInputChange }) {
  return (
    <Paper elevation={3} sx={{ mb: 3 }}>
      <TextField label="Enter text" fullWidth multiline rows={7} value={inputText} onChange={handleInputChange} variant="outlined" />
    </Paper>
  );
}