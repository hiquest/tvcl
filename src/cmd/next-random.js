const {bold} = require('chalk');
const moment = require('moment');

const storage = require('../lib/storage');
const watcher = require('../lib/watcher');
const {pr}    = require('../lib/utils');
const printEp = require('../lib/print_ep');

function rem(param) {
  const showOverview = param == '--with-overview' || param == '--wo';
  storage.readAll(() => {
    const series = storage.all();
    if (!series.length) {
      pr('No Series Added Yet. Try `tv lookup <title>` first. And then `tv add <id>`');
      return;
    }

    var nextEps = new Array();

    series.forEach((s) => {
      const title = `${s['Data']['Series'][0]['SeriesName'][0]}`;
      const episodes = s['Data']['Episode'];
      const eps = episodes
        .filter(e => !watcher.isWatched(e))
        .filter(e => !!e['FirstAired'][0])
        .filter(e => moment(e['FirstAired'][0]).isBefore(moment()));

      if (eps.length) {
        nextEps.push({"title": title, "nextEp": eps[0]});
      }
    });

    if (nextEps.length) {
      var ep = nextEps[Math.floor(Math.random() * nextEps.length)];
      pr("  ");
      pr(`${bold(ep.title)}`);
      pr("  ");
      printEp(ep.nextEp, showOverview);
    }
    pr("  ");
  });
}

module.exports = rem;
