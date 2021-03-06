const moment = require('moment')

const storage = require('./storage')
const watcher = require('./watcher')

function all(cb) {
  return filterEps((e) => {
    return !watcher.isWatched(e)
      && moment(e['FirstAired'][0]).isBefore(moment())
  }, cb)
}

function upcoming(cb) {
  return filterEps((e) => {
    const aired = moment(e['FirstAired'][0])
    return aired.isBefore(moment().add(2, 'M')) && aired.isAfter(moment())
  }, cb)
}

function filterEps(filterFn, cb) {
  storage.readAll(() => {
    const serieses = storage.all()
    if (!serieses.length) {
      cb(null)
      return
    }

    const out = serieses
      .map((s) => {
        const eps = s['Data']['Episode']
          .filter(e => !watcher.isWatched(e))
          .filter(filterFn)

        return {
          seriesTitle: s['Data']['Series'][0]['SeriesName'][0],
          episodes: eps
        }
      })
      .filter(s => s.episodes.length > 0)
    cb(out)
  })
}

module.exports = { all, upcoming }
