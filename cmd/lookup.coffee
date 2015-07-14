{xmlReq, error} = require '../lib/utils'
printSeries = require '../lib/print_series'

KEY = process.env.THETVDB_API_KEY
API_HOST = 'http://thetvdb.com'

# API URL
api_lookup = (q) -> "#{API_HOST}/api/GetSeries.php?seriesname=#{q}"

lookup = (q) ->
  return error('Please specify title to look for') unless q
  xmlReq api_lookup(q), (res) ->
    return error('Could not find any show') unless res['Data']['Series']
    res['Data']['Series'].forEach(printSeries)

module.exports = lookup
