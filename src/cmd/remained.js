const {bold} = require('chalk');

const EpisodesToWatch = require('../lib/episodes_to_watch');
const {pr}    = require('../lib/utils');
const printEp = require('../lib/print_ep');

function rem(param) {
  const showOverview = param == '--with-overview' || param == '--wo';

  EpisodesToWatch.all((serieses) => {

    if (!serieses) {
      pr('No Series Added Yet. Try `tv lookup <title>` first. And then `tv add <id>`');
      return;
    }

    serieses.forEach((s) => {
      pr("  ");
      pr(bold(s.seriesTitle));
      pr("  ");
      s.episodes.forEach((e) => printEp(e, showOverview));
      pr("  ");
    });

  });
}

module.exports = rem;
