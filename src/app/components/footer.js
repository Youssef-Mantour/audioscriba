'use client'
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// MUI icons
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X'; // Twitter/X icon
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // TikTok placeholder (since TikTok icon is not in MUI)

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 0,
        px: 0,
        mt:-2,
        mb:-2,
        backgroundColor: "rgba(238, 236, 236, 1)",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary" align="center" >
        <Link href="/contact" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
          Contact
        </Link>
        </Typography>
        
        

        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <IconButton
            component="a"
            href="https://x.com/MantourYoussef"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <XIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://linkedin.com/in/youssef-mantour-780a8950/"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <LinkedInIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://facebook.com/youssef.mantour"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://tiktok.com/@youssef_mantour"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <MusicNoteIcon /> {/* TikTok placeholder */}
          </IconButton>

          <IconButton
            component="a"
            href="https://youtube.com/@knowledgeaction2348"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <YouTubeIcon />
          </IconButton>
        </Stack>

        <Typography variant="body1" color="text.secondary" align="center" mt={3}>
          Created by YoMa AI & Web Solutions
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} All Rights Reserved
        </Typography>
      </Container>
    </Box>
  );
};
