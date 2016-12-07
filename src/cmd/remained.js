const {bold} = require('chalk');

const EpisodesToWatch = require('../lib/episodes_to_watch');
const {pr}    = require('../lib/utils');
const printEp = require('../lib/print_ep');

function rem(param) {
  const showOverview = param == '--with-overview' || param == '--wo';

  EpisodesToWatch.all((serieses) => {

    if (!serieses || !serieses.length) {
      pr(" ");
      pr('✓ All done. Try `tv lookup <title>` to search new shows');
      pr(" ");
      return;
    }

    serieses.forEach((s) => {
      if (!s.episodes.length) {
        return;
      }
      pr(" ");
      pr(bold(s.seriesTitle));
      pr(" ");
      s.episodes.forEach(e => printEp(e, showOverview));
      pr(" ");
    });

  });
}

module.exports = rem;
