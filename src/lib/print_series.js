const {bold, gray} = require('chalk');
const {pr} = require('./utils');

function printOverview(s) {
  let overview = s['Overview'] && s['Overview'][0];
  if (overview) {
    if (overview.length > 256) {
      overview = overview.substring(0, 256) + '...';
    }
    pr(gray(overview));
  }
}

function printSeries(s, overview = true) {
  const id = s['seriesid'] || s['id'][0];
  const name = bold(s['SeriesName']);
  const aired = s['FirstAired'] || '?';
  const resLine = `${id} ${name} (since ${aired})`;
  pr(resLine);
  if (overview) {
    printOverview(s);
    pr('  ');
  }
}

module.exports = printSeries;
