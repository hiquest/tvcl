fs = require 'fs'
xml2js = require 'xml2js'
async = require 'async'
path = require 'path'
unzip = require 'unzip'
_ = require 'underscore'
rimraf = require 'rimraf'

{error, download} = require './utils'

KEY = process.env.THETVDB_API_KEY
API_HOST = 'http://thetvdb.com'
BASE = "#{process.env['HOME']}/.tvcl"
BASE_STORE = "#{BASE}/store"

storage = {}

findEp = (epId) ->
  ids = Object.keys(storage)
  series = findByEp(epId)
  return undefined if !series
  episodes = series['Data']['Episode']
  _.find episodes, (e) ->
      e['id'][0] == epId

findByEp = (epId) ->
  ids = Object.keys(storage)
  id = _.find ids, (id) ->
    episodes = storage[id]['Data']['Episode']
    _.some episodes, (e) ->
      e['id'][0] == epId
  storage[id]

readSeries = (id, cb) ->
  xml_file = "#{BASE_STORE}/#{id}/en.xml"
  error("Could not find the show: maybe `add` it first?") unless fs.existsSync(xml_file)
  str = fs.readFileSync(xml_file)
  parser = new xml2js.Parser()
  parser.parseString str, (err, result) ->
    return error(err) if err
    storage[id] = result
    cb('', result)

available = ->
  fs.readdirSync(BASE_STORE).filter (f) ->
    fs.statSync(path.join(BASE_STORE, f)).isDirectory()

readAll = (cb) ->
  return error("Your database is empty") unless fs.existsSync(BASE_STORE)
  async.map(available(), readSeries, cb)

series = (id, cb) ->
  if storage[id]
    cb(storage[id])
  else
    readSeries id, (err, res) ->
      cb(storage[id])

add = (id, cb) ->
  zip_url = (id) -> "#{API_HOST}/api/#{KEY}/series/#{id}/all/en.zip"
  fs.mkdirSync(BASE) unless fs.existsSync(BASE)
  fs.mkdirSync(BASE_STORE) unless fs.existsSync(BASE_STORE)

  zipFile = "#{BASE_STORE}/#{id}.zip"

  download zip_url(id), zipFile, ->
    fs.createReadStream(zipFile)
      .pipe(unzip.Extract(path: "#{BASE_STORE}/#{id}"))
      .on 'close', -> cb()

rm = (id, cb) ->
  files = [
    "#{BASE_STORE}/#{id}.zip",
    "#{BASE_STORE}/#{id}"
  ]
  async.map(files, rimraf, cb)

updateOne = (id, cb) ->
  rm id, ->
    add id, ->
      cb()

update = (cb) ->
  all_series = available()
  async.map(all_series, updateOne, cb)

# Should be used only after readAll!
all = ->
  Object.keys(storage).map (k) -> storage[k]

module.exports =
  series: series
  readAll: readAll
  findSeriesByEp: findByEp
  findEp: findEp
  add: add
  all: all
  rm: rm
  update: update
