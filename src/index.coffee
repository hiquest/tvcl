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

{error}   = require('./lib/utils')

# Checking if key is present
KEY = process.env.THETVDB_API_KEY
unless KEY
  console.log "You should set up 'THETVDB_API_KEY' env variable"
  proccess.exit(1)

cmd = process.argv[2]
args = process.argv.slice(3)

commands =
  lookup: lookup
  add: add
  watch: watch
  'watch-till': watchTill
  view: view
  list: list
  rm: rm
  update: update
  remained: remained

fn = undefined
if cmd
  fn = commands[cmd]
  return error("Unsupported command") unless fn
else
  fn = remained # Default command

fn(args...)
