COMMANDS = ['lookup']
cmd = process.argv[2]

KEY = process.env.THETVDB_API_KEY

lookup = (q) ->
  console.log(q)
  console.log('Please specify title to look for') unless q

if cmd == 'lookup'
  args = process.argv.slice(3).join(' ')
  lookup(args)
else
  console.log('Unsupported command')
  process.exit(1)
