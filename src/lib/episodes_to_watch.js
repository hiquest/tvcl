const moment = require('moment');

const storage = require('./storage');
const watcher = require('./watcher');

function all(cb) {
  storage.readAll(() => {
    const serieses = storage.all();
    if (!serieses.length) {
      cb(null);
      return;
    }

    const out = serieses
      .map((s) => {
        const eps = s['Data']['Episode']
          .filter(e => !watcher.isWatched(e))
          .filter(e => !!e['FirstAired'][0])
          .filter(e => moment(e['FirstAired'][0]).isBefore(moment()));

        return {
          seriesTitle: s['Data']['Series'][0]['SeriesName'][0],
          episodes: eps
        };
      })
      .filter(s => s.episodes.length > 0);
    cb(out);
  });
}

module.exports = { all };
