storage = require '../lib/storage'

rm = (id) ->
  storage.rm id, ->
    console.log 'Removed'

module.exports = rm
