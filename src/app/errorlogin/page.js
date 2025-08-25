'use client'
import { Box } from "@mui/material"
export default function ErrorPage() {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Error</h1>
      <h2>There was an issue with your request. Please try again.</h2>
    </Box>
  );
}