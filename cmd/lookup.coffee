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
      aired = s['FirstAired'] || '?'
      resLine = "#{s['seriesid']} #{name} (since #{aired})"
      pr(resLine)

      overview = s['Overview'] && s['Overview'][0]
      if overview
        overview = overview.substring(0, 256) + '...' if overview.length > 256
        pr(gray(overview))
      pr('  ')

module.exports = lookup
