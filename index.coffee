lookup = require('./lib/lookup')

cmd = process.argv[2]
if cmd == 'lookup'
  args = process.argv.slice(3).join(' ')
  lookup(args)
else
  console.log('Unsupported command')
  process.exit(1)
