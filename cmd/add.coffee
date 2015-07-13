fs = require('fs')
unzip = require('unzip')
xml2js = require 'xml2js'

{xmlReq, download, error} = require '../lib/utils'
view = require('./view')

KEY = process.env.THETVDB_API_KEY
API_HOST = 'http://thetvdb.com'
BASE = "#{process.env['HOME']}/.tvcli"
BASE_STORE = "#{BASE}/store"

zip_url = (id) -> "#{API_HOST}/api/#{KEY}/series/#{id}/all/en.zip"

printEpisode = (e) ->
  id = e['id'][0]
  season = e['SeasonNumber'][0]
  number = e['EpisodeNumber'][0]
  name = e['EpisodeName'][0]
  aired = e['FirstAired'][0] || 'TBA'
  console.log("   S#{season}E#{number} #{name}, #{aired}")

add = (id) ->
  console.log('Please specify Series id') unless id

  fs.mkdirSync(BASE) unless fs.existsSync(BASE)
  fs.mkdirSync(BASE_STORE) unless fs.existsSync(BASE_STORE)

  zipFile = "#{BASE_STORE}/#{id}.zip"

  download zip_url(id), zipFile, ->
    fs.createReadStream(zipFile)
      .pipe(unzip.Extract(path: "#{BASE_STORE}/#{id}"))
      .on 'close', ->
        view(id)

module.exports = add
