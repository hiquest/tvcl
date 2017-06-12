const { bold } = require('chalk');

const EpisodesToWatch = require('../lib/episodes_to_watch');
const { pr } = require('../lib/utils');
const printEp = require('../lib/print_ep');

function rem(param) {

  EpisodesToWatch.all((serieses) => {

    if (!serieses || !serieses.length) return printStub();

    const showOverview = param == '--with-overview' || param == '--wo';
    serieses
      .filter(s => s.episodes.length > 0)
      .forEach((s) => {
        printSeries(s, showOverview);
      });
  });
}

function printStub() {
  pr(" ");
  pr('✓ All done. Try `tv lookup <title>` to search new shows');
  pr(" ");
}

function printSeries(s, showOverview) {
  pr(" ");
  pr(bold(s.seriesTitle));
  pr(" ");
  s.episodes.forEach(e => printEp(e, showOverview));
  pr(" ");
}

module.exports = rem;
