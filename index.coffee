lookup = require('./lib/lookup')
add    = require('./lib/add')

cmd = process.argv[2]
if cmd == 'lookup'
  args = process.argv.slice(3).join(' ')
  lookup(args)
else if cmd == 'add'
  add(process.argv[3])
else
  console.log('Unsupported command')
  process.exit(1)
