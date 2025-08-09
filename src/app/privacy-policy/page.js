'use client';

import { Box, Typography, Container } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Privacy Policy
      </Typography>

      <Typography variant="body1" paragraph>
        We respect your privacy and are committed to protecting your personal data. This policy
        explains how we collect, use, and safeguard your information.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        1. Information We Collect
      </Typography>
      <Typography variant="body1" paragraph>
        We collect information you provide directly when you use our service, such as your email,
        name, and usage data.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        2. How We Use Your Information
      </Typography>
      <Typography variant="body1" paragraph>
        Your information is used to provide, maintain, and improve our services, communicate with
        you, and ensure security.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        3. Data Sharing and Disclosure
      </Typography>
      <Typography variant="body1" paragraph>
        We do not sell your personal information. We may share data with trusted third parties who
        assist in service delivery under confidentiality agreements.
      </Typography>

      <Typography variant="h5" mt={4} mb={2} fontWeight="bold">
        4. Your Choices
      </Typography>
      <Typography variant="body1" paragraph>
        You can update or delete your account information at any time, and control your email
        preferences.
      </Typography>

      <Typography variant="body2" mt={6} color="text.secondary" align="center">
        Last updated: August 2025
      </Typography>
    </Container>
  );
}
