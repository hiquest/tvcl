{bold, gray, yellow} = require('chalk')
storage = require '../lib/storage'
{pr}= require '../lib/utils'

update = (id) ->
  storage.rm update, ->
    pr "Update all shows...#{bold('OK')}"

module.exports = update
