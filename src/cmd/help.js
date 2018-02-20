const {bold} = require('chalk');

function help() {
  console.log(`\n${bold('tv')} is a simple script that helps keeping track of the shows and episodes (using thetvdb.com API as a source).`);
  console.log(`You need to get the API key (which is free at http://thetvdb.com/?tab=apiregister) and set an environment variable ${bold('THETVDB_API_KEY')}.`);
  console.log("\n");
  console.log(`Usage: ${bold('tv')} <command> {params}`);
  console.log("\n");
  console.log(`${bold('lookup')} or ${bold('search')} <title>`);
  console.log("    look up a show");
  console.log(`${bold('add')} <id>`);
  console.log("    add a show to your list");
  console.log(`${bold('update')}`);
  console.log("    update the local episodes data (you should do it from time to time)");
  console.log(`${bold('list')}`);
  console.log("    list your tv shows");
  console.log(`${bold('view')} or ${bold('show')} <id>`);
  console.log("    show the list of episodes for a specified show");
  console.log(`${bold('rm')} <id>`);
  console.log("    remove a tv show from the local database");
  console.log(`${bold('watch')} <episode-id>`);
  console.log("    mark a specific episode as watched");
  console.log(`${bold('watch-till')} or ${bold('wt')} <episode-id>`);
  console.log("    mark a specific episode as watched and all of the episodes before it");
  console.log(`${bold('remained')} ( or with no command )`);
  console.log("    show episodes remained to be watched (but only the ones that are out already)");
  console.log(`${bold('help')}`);
  console.log("    print what you are now looking at");
  console.log("\n");
}

module.exports = help;
