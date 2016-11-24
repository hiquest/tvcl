const {bold, gray, yellow} = require('chalk');
const watcher = require('./watcher');
const {pr} = require('./utils');

function printOverview (e) {
  let overview = e['Overview'] && e['Overview'][0];
  if (overview) {
    if (overview.length > 256) {
      overview = overview.substring(0, 256) + '...';
    }
    pr(gray(overview));
  }
}

function printEp(e, showOverview = false) {
  const watched = watcher.isWatched(e);
  const id = e['id'][0];
  const season = e['SeasonNumber'][0];
  const number = e['EpisodeNumber'][0];
  let name = e['EpisodeName'][0];
  if (!watched) {
    name = yellow(name);
  }
  const aired = e['FirstAired'][0] || 'TBA';
  const code = bold(`S${season}E${number}`);
  let line = `${id} ${code} ${name}, ${aired}`;
  if (watched) {
    line = gray(line);
  }
  pr(line);
  if (showOverview) {
    printOverview(e);
    pr("");
  }
}

module.exports = printEp;
