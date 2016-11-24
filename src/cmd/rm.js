const storage = require('../lib/storage');
const {pr} = require('../lib/utils');

function rm(id) {
  storage.rm(id, () => {
    pr();
    pr('✓ Show has been removed');
    pr();
  });
}

module.exports = rm;
