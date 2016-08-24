# All the commands we have
lookup    = require('./cmd/lookup')
add       = require('./cmd/add')
view      = require('./cmd/view')
list      = require('./cmd/list')
watch     = require('./cmd/watch')
watchTill = require('./cmd/watch-till')
rm        = require('./cmd/rm')
update    = require('./cmd/update')
remained  = require('./cmd/remained')
help      = require('./cmd/help')

{error}   = require('./lib/utils')

# Checking if key is present
KEY = process.env.THETVDB_API_KEY
unless KEY
  console.log "You should set up 'THETVDB_API_KEY' env variable. Go here to get it: http://thetvdb.com/?tab=apiregister"
  process.exit(1)

cmd = process.argv[2]
args = process.argv.slice(3)

commands =
  lookup: lookup
  search: lookup # alias
  add: add
  watch: watch
  'watch-till': watchTill
  wt: watchTill
  view: view
  show: view
  list: list
  rm: rm
  update: update
  remained: remained
  help: help

fn = if cmd
       commands[cmd]
     else
       remained # Default command

error("Unsupported command") unless fn

fn(args...)
