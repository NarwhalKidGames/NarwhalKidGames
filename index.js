// const fs = require('fs');
// const path = require('path');
const express = require('express');
// const fetch = require('node-fetch');
// const { obfuscate } = require('javascript-obfuscator');
// const showdown = require('showdown');

const server = express();
const PORT = 3000;

server.use(express.static('public'));

server.get('*', (req, res) => {
  res.status(404).sendFile(`${__dirname}/404.html`);
});

if (process.env && process.env.replit !== '') {
  server.listen(PORT, () => {
    console.log(`Website running at http://localhost:${PORT}`);
    online = true;
  });
}
