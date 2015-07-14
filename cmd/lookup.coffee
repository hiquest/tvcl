{xmlReq, error, pr} = require '../lib/utils'
{bold, gray, yellow} = require('chalk')

KEY = process.env.THETVDB_API_KEY
API_HOST = 'http://thetvdb.com'

# API URL
api_lookup = (q) -> "#{API_HOST}/api/GetSeries.php?seriesname=#{q}"

lookup = (q) ->
  return error('Please specify title to look for') unless q
  xmlReq api_lookup(q), (res) ->
    return error('Could not find any show') unless res['Data']['Series']
    res['Data']['Series'].forEach (s) ->
      name = bold(s['SeriesName'])
      resLine = "#{s['seriesid']} #{name} (since #{s['FirstAired']})"
      pr(resLine)

module.exports = lookup
