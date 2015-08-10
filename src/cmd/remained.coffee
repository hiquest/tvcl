{bold, gray, yellow} = require('chalk')
moment  = require 'moment'

storage = require '../lib/storage'
watcher = require '../lib/watcher'
{pr}    = require '../lib/utils'
printEp = require '../lib/print_ep'

rem = ->
  storage.readAll ->
    series = storage.all()
    if !series.length
      pr('No Series Added Yet. Try `tv lookup <title>` first')
      return
    series.forEach (s) ->
      title = "[#{s['Data']['Series'][0]['SeriesName'][0]}]"

      episodes = s['Data']['Episode']
      eps = episodes.filter (e) -> !watcher.isWatched(e)
                    .filter (e) -> !!e['FirstAired'][0]
                    .filter (e) -> moment(e['FirstAired'][0]).isBefore(moment())

      if eps.length
        pr("  ")
        pr("#{bold(title)}")
        pr("  ")
        eps.forEach (e) -> printEp(e)

module.exports = rem
