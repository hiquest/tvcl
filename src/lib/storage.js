const fs = require('fs')
const xml2js = require('xml2js')
const async = require('async')
const path = require('path')
const unzip = require('unzipper')
const _ = require('underscore')
const rimraf = require('rimraf')

const {error, download} = require('./utils')

const KEY = process.env.THETVDB_API_KEY
const API_HOST = 'http://thetvdb.com'
const BASE = `${process.env['HOME']}/.tvcl`
const BASE_STORE = `${BASE}/store`

const storage = {}

function findEp(epId) {
  const series = findSeriesByEp(epId)
  if (!series) {
    return undefined
  }
  const episodes = series['Data']['Episode']
  return _.find(episodes, e => e['id'][0] == epId )
}

function findSeriesByEp(epId) {
  const ids = Object.keys(storage)
  const id = _.find(ids, (id) => {
    const episodes = storage[id]['Data']['Episode']
    return _.some(episodes, e => e['id'][0] == epId )
  })
  return storage[id]
}

function readSeries(id, cb) {
  const xml_file = `${BASE_STORE}/${id}/en.xml`
  if (!fs.existsSync(xml_file)) { error("Could not find the show: maybe `add` it first?") }
  const str = fs.readFileSync(xml_file)
  const parser = new xml2js.Parser()
  parser.parseString(str, function(err, result) {
    if (err) { return error(err) }
    storage[id] = result
    return cb('', result)
  })
}

function available() {
  return fs
    .readdirSync(BASE_STORE)
    .filter(f => fs.statSync(path.join(BASE_STORE, f)).isDirectory())
}

function readAll(cb) {
  if (!fs.existsSync(BASE_STORE)) {
    return error("No Series Added Yet. Try `tv lookup <title>` first. And then `tv add <id>`")
  }
  return async.map(available(), readSeries, cb)
}

function series(id, cb) {
  if (storage[id]) {
    return cb(storage[id])
  } else {
    return readSeries(id, () => cb(storage[id]))
  }
}

function add(id, cb) {
  const zip_url = id => `${API_HOST}/api/${KEY}/series/${id}/all/en.zip`
  if (!fs.existsSync(BASE)) { fs.mkdirSync(BASE) }
  if (!fs.existsSync(BASE_STORE)) { fs.mkdirSync(BASE_STORE) }

  const zipFile = `${BASE_STORE}/${id}.zip`

  return download(zip_url(id), zipFile, () =>
    fs.createReadStream(zipFile)
      .pipe(unzip.Extract({path: `${BASE_STORE}/${id}`}))
      .on('close', () => cb())
  )
}

function rm(id, cb) {
  let files = [
    `${BASE_STORE}/${id}.zip`,
    `${BASE_STORE}/${id}`
  ]
  return async.map(files, rimraf, cb)
}

function updateOne(id, cb) {
  rm(id, () =>
    add(id, () => cb())
  )
}

function update(cb) {
  return async.map(available(), updateOne, cb)
}

// Should be used only after readAll!
function all(){
  return Object.keys(storage).map(k => storage[k])
}

module.exports = {
  series,
  readAll,
  findSeriesByEp,
  findEp,
  add,
  all,
  rm,
  update
}
