{error, pr} = require './utils'
watcher = require './watcher'

watch = (epId) ->
  return error("Specify episode id") unless epId
  watcher.watch(epId)
  watcher.save()

module.exports = watch
