fs = require('fs')
xml2js = require 'xml2js'
{bold, gray, yellow} = require('chalk')

{error} = require '../lib/utils'
watcher = require '../lib/watcher'

BASE = "#{process.env['HOME']}/.tvcli"
BASE_STORE = "#{BASE}/store"

printEpisode = (e) ->
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

view = (id) ->
  console.log('Please specify Series id') unless id
  xml_file = "#{BASE_STORE}/#{id}/en.xml"
  error("Could not find the show: maybe you need to `add` it first?") unless fs.existsSync(xml_file)

  parser = new xml2js.Parser()
  fs.readFile xml_file, (err, data) ->
    return error(err) if err
    parser.parseString data, (err, result) ->
      return error(err) if err
      episodes = result['Data']['Episode']
      episodes.forEach(printEpisode)

module.exports = view
