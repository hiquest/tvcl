const {xmlReq, error, pr} = require('../lib/utils')
const printSeries = require('../lib/print_series')

const API_HOST = 'http://thetvdb.com'

// API URL
const api_lookup = (q) => `${API_HOST}/api/GetSeries.php?seriesname=${q}`

function lookup(...args) {
  const q = args.join(' ')
  if (!q) {
    return error('Please specify title to look for')
  }
  xmlReq(api_lookup(q), (res) => {
    if (!res['Data']['Series']) {
      return error('Could not find any show')
    }
    pr()
    res['Data']['Series'].forEach((s) => printSeries(s))

    pr("To add a show type `tv add <id>`")
    pr()
  })
}

module.exports = lookup
