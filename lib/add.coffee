fs = require('fs')
unzip = require('unzip')

{xmlReq, download} = require './utils'

KEY = process.env.THETVDB_API_KEY
API_HOST = 'http://thetvdb.com'
BASE = "#{process.env['HOME']}/.tvcli"
BASE_STORE = "#{BASE}/store"

zip_url = (id) -> "#{API_HOST}/api/#{KEY}/series/#{id}/all/en.zip"

add = (id) ->
  console.log('Please specify Series id') unless id

  fs.mkdirSync(BASE) unless fs.existsSync(BASE)
  fs.mkdirSync(BASE_STORE) unless fs.existsSync(BASE_STORE)

  zipFile = "#{BASE_STORE}/#{id}.zip"

  download zip_url(id), zipFile, ->
    console.log 'finished'
    fs.createReadStream(zipFile)
      .pipe(unzip.Extract(path: "#{BASE_STORE}/#{id}"))
      .on 'close', ->
        console.log 'unzipped'

module.exports = add
