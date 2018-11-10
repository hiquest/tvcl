const {error, pr} = require('../lib/utils')
const storage = require('../lib/storage')
const printSeries = require('../lib/print_series')

function list() {
  storage.readAll(() => {
    const series = storage.all()
    if (series.length) {
      pr("")
      pr("List of tracked shows (use `tv update` to sync)")
      pr("")
      storage
        .all()
        .map((s) => s['Data']['Series'][0])
        .forEach((s) => printSeries(s, false, true))
      pr("")
    } else {
      return error("No Series Added Yet. Try `tv lookup <title>` first. And then `tv add <id>`")
    }
  })
}

module.exports = list
