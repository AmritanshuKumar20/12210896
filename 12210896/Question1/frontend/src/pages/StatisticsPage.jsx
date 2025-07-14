import React from 'react';
import { retrieveURLs, getURLClicks } from '../utils/storage';
import { Container, Paper, Typography, Stack } from '@mui/material';

const StatisticsPage = () => {
  const storedLinks = retrieveURLs();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom my={4}>
        Shortened URL Stats
      </Typography>

      {storedLinks.length === 0 ? (
        <Typography align="center">No data found.</Typography>
      ) : (
        <Stack spacing={2}>
          {storedLinks.map((entry, idx) => {
            const activity = getURLClicks(entry.shortcode);
            return (
              <Paper key={idx} sx={{ p: 2 }}>
                <Typography><strong>Short:</strong> http://localhost:3000/{entry.shortcode}</Typography>
                <Typography><strong>Destination:</strong> {entry.original}</Typography>
                <Typography><strong>Created:</strong> {entry.createdAt}</Typography>
                <Typography><strong>Expires:</strong> {entry.expiresAt}</Typography>
                <Typography><strong>Clicks:</strong> {activity.length}</Typography>
                {activity.map((click, i) => (
                  <Typography key={i} variant="body2" sx={{ ml: 2 }}>
                    {click.timestamp} | {click.source || 'Unknown'} | {click.location || 'India'}
                  </Typography>
                ))}
              </Paper>
            );
          })}
        </Stack>
      )}
    </Container>
  );
};

export default StatisticsPage;