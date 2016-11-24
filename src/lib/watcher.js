const fs = require('fs');

const BASE = `${process.env['HOME']}/.tvcl`;
const WATCH_FILE = `${BASE}/watch.json`;

let cache = undefined;

function read() {
  if (fs.existsSync(WATCH_FILE)) {
    cache = JSON.parse(fs.readFileSync(WATCH_FILE));
  } else {
    cache = {};
  }
}

function watch(epId) {
  if (!cache) {
    read();
  }
  cache[epId] = true;
}

function save() {
  if (!cache) {
    read();
  }
  fs.writeFileSync(WATCH_FILE, JSON.stringify(cache));
}

function isWatched(e) {
  if (!cache) {
    read();
  }
  const id = e['id'][0];
  return !!cache[id];
}

module.exports = { watch, save, isWatched };
