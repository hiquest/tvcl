{error} = require '../lib/utils'
storage = require '../lib/storage'
printSeries = require '../lib/print_series'

list = ->
  storage.readAll ->
    series = storage.all()
    if series.length
      storage.all().forEach (s) ->
        printSeries(s['Data']['Series'][0])
    else
      return error("Your database is empty")

module.exports = list
