{error} = require '../lib/utils'
storage = require '../lib/storage'
printEp = require '../lib/print_ep'

view = (id) ->
  return error('Please specify series id') unless id
  storage.series id, (result) ->
    episodes = result['Data']['Episode']
    episodes.forEach(printEp)

module.exports = view
