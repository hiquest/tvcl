const {error} = require('../lib/utils');
const storage = require('../lib/storage');
const view = require('./view');

function add(id) {
  if (!id) {
    error('Please specify Series id');
  }
  storage.add(id, () => view(id));
}

module.exports = add;
