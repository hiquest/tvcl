{xmlReq} = require './utils'

KEY = process.env.THETVDB_API_KEY
API_HOST = 'http://thetvdb.com'

# API URL
api_lookup = (q) -> "#{API_HOST}/api/GetSeries.php?seriesname=#{q}"

lookup = (q) ->
  console.log('Please specify title to look for') unless q
  xmlReq api_lookup(q), (res) ->
    res['Data']['Series'].forEach (s) ->
      resLine = "#{s['seriesid']} #{s['SeriesName']} (since #{s['FirstAired']})"
      console.log(resLine)

module.exports = lookup
