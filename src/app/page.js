"use client";

import { Container, Typography, Button, Box, Link, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function HomePage() {
  return (

    
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" color="primary" gutterBottom>
          Welcome to txtvoxai
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Turn any text into realistic, natural-sounding speech using our AI-powered TTS technology.
        </Typography>
      </Box>

      <Box mb={6}>
        <Typography variant="h5" gutterBottom>
          Why choose txtvoxai?
        </Typography>
        <List>
          {[
            "Realistic voices with cutting-edge AI",
            "Multiple languages and accents",
            "Download audio in MP3 or WAV",
            "Flexible voice options (male/female)",
            "Free trial with limited characters",
            "Friendly support via email & chat"
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box textAlign="center">
       <Link href="/login" passHref legacyBehavior>
  
    Get Started
  
</Link>
      </Box>
    </Container>
  );
}
