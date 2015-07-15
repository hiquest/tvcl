{bold, gray, yellow} = require('chalk')
watcher = require './watcher'
{pr} = require './utils'

printOverview = (e) ->
  overview = e['Overview'] && e['Overview'][0]
  if overview
    overview = overview.substring(0, 256) + '...' if overview.length > 256
    pr(gray(overview))

printEp = (e, showOverview = false) ->
  watched = watcher.isWatched(e)
  id = e['id'][0]
  season = e['SeasonNumber'][0]
  number = e['EpisodeNumber'][0]
  name = e['EpisodeName'][0]
  name = yellow(name) unless watched
  aired = e['FirstAired'][0] || 'TBA'
  code = bold("S#{season}E#{number}")
  line = "#{id} #{code} #{name}, #{aired}"
  line = gray(line) if watched
  pr(line)
  if showOverview
    printOverview(e)
    pr("")

module.exports = printEp
