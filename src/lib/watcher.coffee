fs = require('fs')

BASE = "#{process.env['HOME']}/.tvcl"
WATCH_FILE = "#{BASE}/watch.json"

watch = undefined

read = ->
  watch = if fs.existsSync(WATCH_FILE)
          JSON.parse(fs.readFileSync(WATCH_FILE))
        else
          {}

watchFn = (epId) ->
  read() unless watch
  watch[epId] = true

save = ->
  read() unless watch
  fs.writeFileSync(WATCH_FILE, JSON.stringify(watch))

isWatched = (e) ->
  read() unless watch
  id = e['id'][0]
  return !!watch[id]

module.exports =
  watch: watchFn
  save: save
  isWatched: isWatched
