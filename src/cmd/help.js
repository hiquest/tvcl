const {bold} = require('chalk');

function help() {
  console.log(`\n${bold('tvcl')} is a simple script that helps to keep track of episodes watched and episodes available (using thetvdb.com API as a source).`);
  console.log(`You need to get an API key (which is free at http://thetvdb.com/?tab=apiregister) and set an environment variable #{bold('THETVDB_API_KEY')}.`);
  console.log("\n");
  console.log(`Usage: ${bold('tvcl')} <command> {params}`);
  console.log("\n");
  console.log(`${bold('lookup')} or ${bold('search')} <title>`);
  console.log("    lookup for a particular show");
  console.log(`${bold('add')} <id>`);
  console.log("    add the show to local database");
  console.log(`${bold('update')}`);
  console.log("    updates the local episodes data (you should do it from time to time)");
  console.log(`${bold('list')}`);
  console.log("    list the tv shows in local database");
  console.log(`${bold('view')} or ${bold('show')} <id>`);
  console.log("    show the list of episodes");
  console.log(`${bold('rm')} <id>`);
  console.log("    removes the tv show from local database");
  console.log(`${bold('watch')} <episode-id>`);
  console.log("    mark a specific episode as watched");
  console.log(`${bold('watch-till')} or ${bold('wt')} <episode-id>`);
  console.log("    mark a specific episode as watched and all of the episodes before it");
  console.log(`${bold('remained')} ( or with no command )`);
  console.log("    shows episodes remained to be watched (but only the ones that are out by current date)");
  console.log(`${bold('help')}`);
  console.log("    prints what you are now looking at");
  console.log("\n");
}

module.exports = help;
