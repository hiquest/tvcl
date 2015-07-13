fs = require('fs')
xml2js = require 'xml2js'
{bold} = require('chalk')

{error} = require './utils'

BASE = "#{process.env['HOME']}/.tvcli"
BASE_STORE = "#{BASE}/store"

printEpisode = (e) ->
  id = e['id'][0].green
  season = e['SeasonNumber'][0]
  number = e['EpisodeNumber'][0]
  name = bold(e['EpisodeName'][0])
  aired = e['FirstAired'][0] || 'TBA'
  code = "S#{season}E#{number}"
  console.log("   #{code} #{name}, #{aired}")

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
