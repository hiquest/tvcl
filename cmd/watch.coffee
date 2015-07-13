{error, pr} = require '../lib/utils'
watcher = require '../lib/watcher'

watch = (epId) ->
  return error("Specify episode id") unless epId
  watcher.watch(epId)
  watcher.save()

module.exports = watch
