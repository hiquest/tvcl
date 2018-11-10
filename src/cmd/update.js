const {bold} = require('chalk')
const storage = require('../lib/storage')
const {pr} = require('../lib/utils')

function update() {
  storage.update(() => {
    pr()
    pr(`Update all shows...${bold('OK')}`)
    pr()
  })
}

module.exports = update
