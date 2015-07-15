{error} = require '../lib/utils'
storage = require '../lib/storage'
view = require('./view')

add = (id) ->
  error('Please specify Series id') unless id
  storage.add id, ->
    view(id)

module.exports = add
