const {error} = require('../lib/utils');
const watcher = require('../lib/watcher');

function watch(...ids) {
  if (!ids.length) {
    return error("Specify episode id");
  }
  ids.forEach((id) => watcher.watch(id));
  watcher.save();
}

module.exports = watch;
