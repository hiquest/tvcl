const moment = require('moment');

const {error} = require('../lib/utils');
const watcher = require('../lib/watcher');
const storage = require('../lib/storage');

function till(epId) {
  if (!epId) {
    return error("Please specify episode id");
  }
  storage.readAll(() => {
    const episode = storage.findEp(epId);
    const epMomemnt = moment(episode['FirstAired'][0]);

    const series = storage.findSeriesByEp(epId);
    const episodes = series['Data']['Episode'];
    episodes.forEach((e) => {
      const aired = e['FirstAired'][0];
      if (!aired) {
        return;
      }
      const m = moment(aired);
      if (m.isBefore(epMomemnt)) {
        watcher.watch(e['id'][0]);
      }
    });
    watcher.save();
  });
}

module.exports = till;
