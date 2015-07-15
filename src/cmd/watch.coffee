{error, pr} = require '../lib/utils'
watcher = require '../lib/watcher'

watch = (ids) ->
  return error("Specify episode id") unless ids.length
  ids.forEach (id) -> watcher.watch(id)
  watcher.save()

module.exports = watch
