import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import URLForm from '../components/URLForm';

const ShortenerPage = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5} mb={3}>
        <Typography variant="h3" align="center" fontWeight={500}>
          Shorten Your URLs
        </Typography>
      </Box>
      <URLForm />
    </Container>
  );
};

export default ShortenerPage;