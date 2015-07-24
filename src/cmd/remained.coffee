{bold, gray, yellow} = require('chalk')

storage = require '../lib/storage'
watcher = require '../lib/watcher'
{pr}    = require '../lib/utils'
printEp = require '../lib/print_ep'

rem = ->
  storage.readAll ->
    series = storage.all()
    series.forEach (s) ->
      title = "[#{s['Data']['Series'][0]['SeriesName'][0]}]"

      episodes = s['Data']['Episode']
      eps = episodes.filter (e) -> !watcher.isWatched(e)

      if eps.length
        pr("  ")
        pr("#{bold(title)}")
        pr("  ")
        eps.forEach (e) -> printEp(e)

module.exports = rem
