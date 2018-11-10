const {error, pr} = require('../lib/utils')
const storage = require('../lib/storage')
const printEp = require('../lib/print_ep')

function view(id, param) {
  if (!id) {
    return error('Please specify series id')
  }
  storage.series(id, (result) => {
    const episodes = result['Data']['Episode']
    const showOverview = param == '--with-overview' || param == '--wo'
    pr()
    episodes.forEach(e => printEp(e, showOverview))
    pr()
  })
}

module.exports = view
