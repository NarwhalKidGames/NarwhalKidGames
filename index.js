const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const { spawn } = require('child_process');

const repoOwner = "NarwhalKidGames";
const repoName = "NarwhalKidGames";

function getLocalVersion() {
  return "v1.2.1";
}

async function getLatestVersion() {
  const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`);
  const data = await res.json();
  return data.tag_name;
}

async function getChangedFiles(from, to) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/compare/${from}...${to}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Compare API error: ${res.status}`);
  const data = await res.json();
  return data.files.filter(f => f.status !== 'removed');
}

async function downloadAndReplaceFile(file) {
  const res = await fetch(file.raw_url);
  if (!res.ok) throw new Error(`Failed to download ${file.filename}`);
  const data = await res.buffer();
  const dest = path.join(__dirname, file.filename);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, data);
}

async function updateIfNeeded() {
  const localVersion = getLocalVersion();
  const latestVersion = await getLatestVersion();

  if (!localVersion || localVersion !== latestVersion) {
    console.log(`Updating from ${localVersion || 'unknown'} to ${latestVersion}...`);
    const files = await getChangedFiles(localVersion, latestVersion);
    for (const file of files) {
      console.log(`Updating ${file.filename}`);
      await downloadAndReplaceFile(file);
    }
    console.log("Update complete. Please restart START.bat");
  } else {
    console.log("No update needed.");
  }
}

(async () => {
  try {
    await updateIfNeeded();
  } catch (err) {
    console.log("Update check failed.");
    console.log(err);
  }

  const server = express();
  const PORT = 3000;

  server.use(express.static('public'));

  server.get('*', (req, res) => {
    res.status(404).sendFile(`${__dirname}/404.html`);
  });

  server.listen(PORT, () => {
    console.log(`Website running at http://localhost:${PORT}`);
  });
})();
