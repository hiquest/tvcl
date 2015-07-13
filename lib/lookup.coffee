req = require('request')
{parseString} = require 'xml2js'
{inspect} = require 'util'

KEY = process.env.THETVDB_API_KEY
API_HOST = 'http://thetvdb.com'

error = (msg) ->
  console.log("#{msg}")
  process.exit(1)

# API URL
api_lookup = (q) -> "#{API_HOST}/api/GetSeries.php?seriesname=#{q}"

lookup = (q) ->
  console.log('Please specify title to look for') unless q
  req api_lookup(q), (err, resp, body) ->
    return error("Error while lookup: #{err}") if err
    return error("Error while lookup: code — #{resp.statusCode}") if resp.statusCode != 200

    parseString body, (err, res) ->
      return error("Error while parsing response from lookup: #{err}") if err
      res['Data']['Series'].forEach (s) ->
        resLine = "#{s['seriesid']} #{s['SeriesName']} (since #{s['FirstAired']})"
        console.log(resLine)

module.exports = lookup
