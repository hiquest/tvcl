lookup = require('./cmd/lookup')
add    = require('./cmd/add')
view   = require('./cmd/view')
list   = require('./cmd/list')
watch  = require('./cmd/watch')
watchTill  = require('./cmd/watch-till')
rm     = require('./cmd/rm')
update     = require('./cmd/update')

cmd = process.argv[2]
if cmd == 'lookup'
  args = process.argv.slice(3).join(' ')
  lookup(args)
else if cmd == 'add'
  add(process.argv[3])
else if cmd == 'watch'
  args = process.argv.slice(3)
  watch(args)
else if cmd == 'watch-till'
  watchTill(process.argv[3])
else if cmd == 'list'
  list()
else if cmd == 'view'
  view(process.argv[3])
else if cmd == 'rm'
  rm(process.argv[3])
else if cmd == 'update'
  update()
else
  console.log('Unsupported command')
  process.exit(1)
