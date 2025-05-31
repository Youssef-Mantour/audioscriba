// VoiceSelector.js
import Image from "next/image";
import { Typography, Grid } from "@mui/material";


export default function VoiceSelector({ selectedVoice, handleVoiceChange,voices }) {
  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
      {voices.map((voice) => (
        <Grid item key={voice} sx={{ textAlign: "center", cursor: "pointer" }} onClick={() => handleVoiceChange(voice)}>
          <Image src={`/avatars-voice/${voice}.jpg`} alt={voice} width={50} height={50} optimized="true" style={{
            borderRadius: "50%",
            border: selectedVoice === voice ? "3px solid #009688" : "none",
            boxShadow: selectedVoice === voice ? "0px 2px 10px #009688" : "0px 2px 10px #616161",
            transition: "all 0.3s ease-in-out",
          }}/>
          <Typography variant="body2" sx={{ mt: 0 }}>{voice}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
