// TextInput.js
import { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function TextInput({ inputText, handleInputChange }) {
  const [showDialog, setShowDialog] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (inputText.length > 1000 && !confirmed) {
      setShowDialog(true);
    }
  }, [inputText, confirmed]);

  const handleConfirm = () => {
    setConfirmed(true);
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <Paper elevation={10} sx={{ mb: 2, p: 2 }}>
      <TextField
        label="Enter text"
        fullWidth
        multiline
        rows={8}
        value={inputText}
        onChange={handleInputChange}
        variant="outlined"
      />
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Characters: {inputText.length}
      </Typography>

      <Dialog open={showDialog} onClose={handleCancel}>
        <DialogTitle>Large Input Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your input is over 1000 characters. Processing might take more time. Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">Yes, Continue</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
