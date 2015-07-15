moment = require 'moment'

{error, pr} = require '../lib/utils'
watcher = require '../lib/watcher'
storage = require '../lib/storage'

till = (epId) ->
  return error("Please specify episode id") unless epId
  storage.readAll ->
    episode = storage.findEp(epId)
    epMomemnt = moment(episode['FirstAired'][0])

    series = storage.findSeriesByEp(epId)
    episodes = series['Data']['Episode']
    episodes.forEach (e) ->
      aired = e['FirstAired'][0]
      return unless aired
      m = moment(aired)
      if m.isBefore(epMomemnt)
        watcher.watch(e['id'][0])
    watcher.save()

module.exports = till
