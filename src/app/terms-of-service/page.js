'use client';

import { Box, Typography, Container } from '@mui/material';

export default function TermsOfService() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Terms of Service
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to our SaaS platform. By using our services, you agree to comply with and be
        bound by the following terms and conditions.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        1. Use of Service
      </Typography>
      <Typography variant="body1" paragraph>
        You agree to use our services only for lawful purposes and in a way that does not infringe
        the rights of, restrict or inhibit anyone else's use and enjoyment of the services.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        2. Account Responsibility
      </Typography>
      <Typography variant="body1" paragraph>
        You are responsible for maintaining the confidentiality of your account credentials and for
        all activities that occur under your account.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        3. Intellectual Property
      </Typography>
      <Typography variant="body1" paragraph>
        All content and services provided are the intellectual property of our company and may not
        be copied, modified, or distributed without prior written consent.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        4. Termination
      </Typography>
      <Typography variant="body1" paragraph>
        We reserve the right to suspend or terminate your access to the service at any time without
        notice if you breach these terms.
      </Typography>

      <Typography variant="body2" mt={6} color="text.secondary" align="center">
        Last updated: August 2025
      </Typography>
    </Container>
  );
}
