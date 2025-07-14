import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Stack
} from '@mui/material';
import { recordLog } from '../utils/Logger';
import { storeURL } from '../utils/storage';

const createShortCode = () =>
  Math.random().toString(36).slice(2, 8).toLowerCase();

const URLForm = () => {
  const [entries, setEntries] = useState([
    { longLink: '', duration: '', customCode: '' }
  ]);
  const [output, setOutput] = useState([]);

  const updateField = (index, key, value) => {
    const updated = [...entries];
    updated[index][key] = value;
    setEntries(updated);
  };
  const appendInput = () => {
    if (entries.length < 5) {
      setEntries([...entries, { longLink: '', duration: '', customCode: '' }]);
    }
  };

  const handleGenerate = () => {
    const resultData = [];

    entries.forEach((item) => {
      try {
        const parsedURL = new URL(item.longLink);
        const validity = parseInt(item.duration) || 30;
        const code = item.customCode || createShortCode();
        const created = new Date();
        const expiry = new Date(created.getTime() + validity * 60000);

        const obj = {
          original: parsedURL.href,
          shortcode: code,
          createdAt: created.toISOString(),
          expiresAt: expiry.toISOString()
        };

        storeURL(obj);
        recordLog('SHORTENED_URL', obj);
        resultData.push(obj);
      } catch {
        recordLog('INVALID_INPUT', `Invalid URL: ${item.longLink}`);
      }
    });

    setOutput(resultData);
  };

  return (
    <Box>
      <Stack spacing={2}>
        {entries.map((row, idx) => (
          <Paper key={idx} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Enter Long URL"
                  value={row.longLink}
                  onChange={(e) => updateField(idx, 'longLink', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Validity (minutes)"
                  value={row.duration}
                  onChange={(e) => updateField(idx, 'duration', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Custom Shortcode"
                  value={row.customCode}
                  onChange={(e) => updateField(idx, 'customCode', e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Box>
          <Button onClick={appendInput} variant="outlined" sx={{ mr: 2 }}>
            + Add URL
          </Button>
          <Button onClick={handleGenerate} variant="contained">
            Generate Short Links
          </Button>
        </Box>

        {output.map((link, idx) => (
          <Paper key={idx} sx={{ p: 2 }}>
            <Typography><strong>Short Link:</strong> http://localhost:3000/{link.shortcode}</Typography>
            <Typography><strong>Original URL:</strong> {link.original}</Typography>
            <Typography><strong>Valid Till:</strong> {link.expiresAt}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default URLForm;