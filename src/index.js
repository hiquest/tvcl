// Check that the API key is set up
const KEY = process.env.THETVDB_API_KEY;
if (!KEY) {
  console.log("You should set up 'THETVDB_API_KEY' env variable. Go here to get it: http://thetvdb.com/?tab=apiregister");
  process.exit(1);
}

const cmd = process.argv[2];
const args = process.argv.slice(3);
if (cmd == "lookup" || cmd == "search") {
  require('./cmd/lookup')(...args);
} else if (cmd == "add") {
  require('./cmd/add')(...args);
} else {
  process.exit(1);
}

// //
// //
// // kk
// // All the commands we have
// const        = require('./cmd/add');
// const view      = require('./cmd/view');
// const list      = require('./cmd/list');
// const watch     = require('./cmd/watch');
// const watchTill = require('./cmd/watch-till');
// const rm        = require('./cmd/rm');
// const update    = require('./cmd/update');
// const remained  = require('./cmd/remained');
// const help      = require('./cmd/help');

// const {error}   = require('./lib/utils');

// const commands = {
//   add: add,
//   watch: watch,
//   'watch-till': watchTill,
//   wt: watchTill,
//   view: view,
//   show: view,
//   list: list,
//   rm: rm,
//   update: update,
//   remained: remained,
//   help: help
// };

// const fn = cmd ? commands[cmd] : remained;

// if (fn) {
//   fn(...args);
// } else {
//   error("Unsupported command");
// }
