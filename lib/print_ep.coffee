{bold, gray, yellow} = require('chalk')
watcher = require './watcher'

printEp = (e) ->
  watched = watcher.isWatched(e)

  id = e['id'][0]
  season = e['SeasonNumber'][0]
  number = e['EpisodeNumber'][0]
  name = e['EpisodeName'][0]
  name = yellow(name) unless watched
  aired = e['FirstAired'][0] || 'TBA'
  code = bold("S#{season}E#{number}")
  line = "   #{id} #{code} #{name}, #{aired}"
  line = gray(line) if watched
  console.log(line)

module.exports = printEp
