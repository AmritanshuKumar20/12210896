const express = require('express');
const logger = require('./middleware/logger');

const app = express();
const port = 3000;

app.use(logger);
app.get('/', (req, res) => {
  res.send('Logging Middleware is active!');
});

app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
