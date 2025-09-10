"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PricingPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.grey[20],
        py: 5,
        px: 0,
        display: "flex",
        //alignItems: "center",
        //justifyContent: "center",
        mt: 10,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {/* <Typography variant="h3" fontWeight="bold" mb={2}>
          Pricing
        </Typography> */}
        {/* <Typography variant="h6" color="text.secondary" mb={2}>
          Simple and transparent pricing. Get 1,000,000 characters for just $7.
        </Typography>
 */}
        <Paper
          elevation={15}
          sx={{
            borderRadius: 4,
            p: 5,
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" fontWeight={600}>
              1,000,000 Credits
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Only $5
            </Typography>

            <List sx={{ width: "100%" }}>
              {[
                "Use for Text-to-Speech generation",
                "No expiration",
                "Instant access",
              ].map((text) => (
                <ListItem key={text} disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon sx={{ color: "success.main" }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>



<Link href="https://txtvoxai.lemonsqueezy.com/buy/01a05a78-1551-45af-a1e4-960506f86d87">
  <Button
    variant="contained"
    size="large"
    sx={{
      borderRadius: 2,
      px: 6,
      textTransform: "none",
      fontWeight: "medium",
    }}
  >
    Buy Now
  </Button>
</Link>

          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
