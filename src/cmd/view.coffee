{error} = require '../lib/utils'
storage = require '../lib/storage'
printEp = require '../lib/print_ep'

view = (id, param) ->
  return error('Please specify series id') unless id
  storage.series id, (result) ->
    episodes = result['Data']['Episode']

    showOverview = param == '--with-overview' || param == '--wo'
    episodes.forEach (e) -> printEp(e, showOverview)

module.exports = view
