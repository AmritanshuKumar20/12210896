const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} | ${req.ip} | ${req.method} ${req.originalUrl}\n`;
  console.log(log);
  fs.appendFile(path.join(__dirname, '../access.log'), log, (err) => {
    if (err) {
      console.error('Error writing log to file:', err);
    }
  });

  next();
};

module.exports = logger;
