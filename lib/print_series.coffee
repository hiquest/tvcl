{bold, gray, yellow} = require('chalk')
watcher = require './watcher'
{pr} = require './utils'

unwrap = (x) ->
  console.log x
  return undefined unless x

printOverview = (s) ->
  overview = s['Overview'] && s['Overview'][0]
  if overview
    overview = overview.substring(0, 256) + '...' if overview.length > 256
    pr(gray(overview))

printSeries = (s) ->
  id = s['seriesid'] || s['id'][0]
  name = bold(s['SeriesName'])
  aired = s['FirstAired'] || '?'
  resLine = "#{id} #{name} (since #{aired})"
  pr(resLine)
  printOverview(s)
  pr('  ')

module.exports = printSeries
