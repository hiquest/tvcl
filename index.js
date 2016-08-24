#!/usr/bin/env node
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var add, error, storage, view;

error = require('../lib/utils').error;

storage = require('../lib/storage');

view = require('./view');

add = function(id) {
  if (!id) {
    error('Please specify Series id');
  }
  return storage.add(id, function() {
    return view(id);
  });
};

module.exports = add;


},{"../lib/storage":14,"../lib/utils":15,"./view":8}],2:[function(require,module,exports){
var bold, help;

bold = require('chalk').bold;

help = function() {
  console.log((bold('tvcl')) + " is a simple script that helps to keep track of episodes watched and episodes available (using thetvdb.com API as a source). You need to get an API key (which is free at http://thetvdb.com/?tab=apiregister) and set an environment variable " + (bold('THETVDB_API_KEY')) + ".");
  console.log("\n");
  console.log("Usage: " + (bold('tvcl')) + " <command> {params}");
  console.log("\n");
  console.log((bold('lookup')) + " or " + (bold('search')) + " <title>");
  console.log("    lookup for a particular show");
  console.log((bold('add')) + " <id>");
  console.log("    add the show to local database");
  console.log("" + (bold('update')));
  console.log("    updates the local episodes data (you should do it from time to time)");
  console.log("" + (bold('list')));
  console.log("    list the tv shows in local database");
  console.log((bold('view')) + " or " + (bold('show')) + " <id>");
  console.log("    show the list of episodes");
  console.log((bold('rm')) + " <id>");
  console.log("    removes the tv show from local database");
  console.log((bold('watch')) + " <episode-id>");
  console.log("    mark a specific episode as watched");
  console.log((bold('watch-till')) + " or " + (bold('wt')) + " <episode-id>");
  console.log("    mark a specific episode as watched and all of the episodes before it");
  console.log((bold('remained')) + " ( or with no command )");
  console.log("    shows episodes remained to be watched (but only the ones that are out by current date)");
  console.log("" + (bold('help')));
  return console.log("    prints what you are now looking at");
};

module.exports = help;


},{"chalk":undefined}],3:[function(require,module,exports){
var error, list, printSeries, storage;

error = require('../lib/utils').error;

storage = require('../lib/storage');

printSeries = require('../lib/print_series');

list = function() {
  return storage.readAll(function() {
    var series;
    series = storage.all();
    if (series.length) {
      return storage.all().map(function(s) {
        return s['Data']['Series'][0];
      }).forEach(function(s) {
        return printSeries(s, false);
      });
    } else {
      return error("No Series Added Yet. Try `tv lookup <title>` first. And then `tv add <id>`");
    }
  });
};

module.exports = list;


},{"../lib/print_series":13,"../lib/storage":14,"../lib/utils":15}],4:[function(require,module,exports){
var API_HOST, KEY, api_lookup, error, lookup, printSeries, ref, xmlReq,
  slice = [].slice;

ref = require('../lib/utils'), xmlReq = ref.xmlReq, error = ref.error;

printSeries = require('../lib/print_series');

KEY = process.env.THETVDB_API_KEY;

API_HOST = 'http://thetvdb.com';

api_lookup = function(q) {
  return API_HOST + "/api/GetSeries.php?seriesname=" + q;
};

lookup = function() {
  var args, q;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  q = args.join(' ');
  if (!q) {
    return error('Please specify title to look for');
  }
  return xmlReq(api_lookup(q), function(res) {
    if (!res['Data']['Series']) {
      return error('Could not find any show');
    }
    return res['Data']['Series'].forEach(printSeries);
  });
};

module.exports = lookup;


},{"../lib/print_series":13,"../lib/utils":15}],5:[function(require,module,exports){
var bold, gray, moment, pr, printEp, ref, rem, storage, watcher, yellow;

ref = require('chalk'), bold = ref.bold, gray = ref.gray, yellow = ref.yellow;

moment = require('moment');

storage = require('../lib/storage');

watcher = require('../lib/watcher');

pr = require('../lib/utils').pr;

printEp = require('../lib/print_ep');

rem = function(param) {
  var showOverview;
  showOverview = param === '--with-overview' || param === '--wo';
  return storage.readAll(function() {
    var series;
    series = storage.all();
    if (!series.length) {
      pr('No Series Added Yet. Try `tv lookup <title>` first. And then `tv add <id>`');
      return;
    }
    return series.forEach(function(s) {
      var episodes, eps, title;
      title = "[" + s['Data']['Series'][0]['SeriesName'][0] + "]";
      episodes = s['Data']['Episode'];
      eps = episodes.filter(function(e) {
        return !watcher.isWatched(e);
      }).filter(function(e) {
        return !!e['FirstAired'][0];
      }).filter(function(e) {
        return moment(e['FirstAired'][0]).isBefore(moment());
      });
      if (eps.length) {
        pr("  ");
        pr("" + (bold(title)));
        pr("  ");
        return eps.forEach(function(e) {
          return printEp(e, showOverview);
        });
      }
    });
  });
};

module.exports = rem;


},{"../lib/print_ep":12,"../lib/storage":14,"../lib/utils":15,"../lib/watcher":16,"chalk":undefined,"moment":undefined}],6:[function(require,module,exports){
var rm, storage;

storage = require('../lib/storage');

rm = function(id) {
  return storage.rm(id, function() {
    return console.log('Removed');
  });
};

module.exports = rm;


},{"../lib/storage":14}],7:[function(require,module,exports){
var bold, gray, pr, ref, storage, update, yellow;

ref = require('chalk'), bold = ref.bold, gray = ref.gray, yellow = ref.yellow;

storage = require('../lib/storage');

pr = require('../lib/utils').pr;

update = function(id) {
  return storage.update(function() {
    return pr("Update all shows..." + (bold('OK')));
  });
};

module.exports = update;


},{"../lib/storage":14,"../lib/utils":15,"chalk":undefined}],8:[function(require,module,exports){
var error, printEp, storage, view;

error = require('../lib/utils').error;

storage = require('../lib/storage');

printEp = require('../lib/print_ep');

view = function(id, param) {
  if (!id) {
    return error('Please specify series id');
  }
  return storage.series(id, function(result) {
    var episodes, showOverview;
    episodes = result['Data']['Episode'];
    showOverview = param === '--with-overview' || param === '--wo';
    return episodes.forEach(function(e) {
      return printEp(e, showOverview);
    });
  });
};

module.exports = view;


},{"../lib/print_ep":12,"../lib/storage":14,"../lib/utils":15}],9:[function(require,module,exports){
var error, moment, pr, ref, storage, till, watcher;

moment = require('moment');

ref = require('../lib/utils'), error = ref.error, pr = ref.pr;

watcher = require('../lib/watcher');

storage = require('../lib/storage');

till = function(epId) {
  if (!epId) {
    return error("Please specify episode id");
  }
  return storage.readAll(function() {
    var epMomemnt, episode, episodes, series;
    episode = storage.findEp(epId);
    epMomemnt = moment(episode['FirstAired'][0]);
    series = storage.findSeriesByEp(epId);
    episodes = series['Data']['Episode'];
    episodes.forEach(function(e) {
      var aired, m;
      aired = e['FirstAired'][0];
      if (!aired) {
        return;
      }
      m = moment(aired);
      if (m.isBefore(epMomemnt)) {
        return watcher.watch(e['id'][0]);
      }
    });
    return watcher.save();
  });
};

module.exports = till;


},{"../lib/storage":14,"../lib/utils":15,"../lib/watcher":16,"moment":undefined}],10:[function(require,module,exports){
var error, pr, ref, watch, watcher,
  slice = [].slice;

ref = require('../lib/utils'), error = ref.error, pr = ref.pr;

watcher = require('../lib/watcher');

watch = function() {
  var ids;
  ids = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  if (!ids.length) {
    return error("Specify episode id");
  }
  ids.forEach(function(id) {
    return watcher.watch(id);
  });
  return watcher.save();
};

module.exports = watch;


},{"../lib/utils":15,"../lib/watcher":16}],11:[function(require,module,exports){
var KEY, add, args, cmd, commands, error, fn, help, list, lookup, remained, rm, update, view, watch, watchTill;

lookup = require('./cmd/lookup');

add = require('./cmd/add');

view = require('./cmd/view');

list = require('./cmd/list');

watch = require('./cmd/watch');

watchTill = require('./cmd/watch-till');

rm = require('./cmd/rm');

update = require('./cmd/update');

remained = require('./cmd/remained');

help = require('./cmd/help');

error = require('./lib/utils').error;

KEY = process.env.THETVDB_API_KEY;

if (!KEY) {
  console.log("You should set up 'THETVDB_API_KEY' env variable. Go here to get it: http://thetvdb.com/?tab=apiregister");
  process.exit(1);
}

cmd = process.argv[2];

args = process.argv.slice(3);

commands = {
  lookup: lookup,
  search: lookup,
  add: add,
  watch: watch,
  'watch-till': watchTill,
  wt: watchTill,
  view: view,
  show: view,
  list: list,
  rm: rm,
  update: update,
  remained: remained,
  help: help
};

fn = cmd ? commands[cmd] : remained;

if (!fn) {
  error("Unsupported command");
}

fn.apply(null, args);


},{"./cmd/add":1,"./cmd/help":2,"./cmd/list":3,"./cmd/lookup":4,"./cmd/remained":5,"./cmd/rm":6,"./cmd/update":7,"./cmd/view":8,"./cmd/watch":10,"./cmd/watch-till":9,"./lib/utils":15}],12:[function(require,module,exports){
var bold, gray, pr, printEp, printOverview, ref, watcher, yellow;

ref = require('chalk'), bold = ref.bold, gray = ref.gray, yellow = ref.yellow;

watcher = require('./watcher');

pr = require('./utils').pr;

printOverview = function(e) {
  var overview;
  overview = e['Overview'] && e['Overview'][0];
  if (overview) {
    if (overview.length > 256) {
      overview = overview.substring(0, 256) + '...';
    }
    return pr(gray(overview));
  }
};

printEp = function(e, showOverview) {
  var aired, code, id, line, name, number, season, watched;
  if (showOverview == null) {
    showOverview = false;
  }
  watched = watcher.isWatched(e);
  id = e['id'][0];
  season = e['SeasonNumber'][0];
  number = e['EpisodeNumber'][0];
  name = e['EpisodeName'][0];
  if (!watched) {
    name = yellow(name);
  }
  aired = e['FirstAired'][0] || 'TBA';
  code = bold("S" + season + "E" + number);
  line = id + " " + code + " " + name + ", " + aired;
  if (watched) {
    line = gray(line);
  }
  pr(line);
  if (showOverview) {
    printOverview(e);
    return pr("");
  }
};

module.exports = printEp;


},{"./utils":15,"./watcher":16,"chalk":undefined}],13:[function(require,module,exports){
var bold, gray, pr, printOverview, printSeries, ref, watcher, yellow;

ref = require('chalk'), bold = ref.bold, gray = ref.gray, yellow = ref.yellow;

watcher = require('./watcher');

pr = require('./utils').pr;

printOverview = function(s) {
  var overview;
  overview = s['Overview'] && s['Overview'][0];
  if (overview) {
    if (overview.length > 256) {
      overview = overview.substring(0, 256) + '...';
    }
    return pr(gray(overview));
  }
};

printSeries = function(s, overview) {
  var aired, id, name, resLine;
  if (overview == null) {
    overview = true;
  }
  id = s['seriesid'] || s['id'][0];
  name = bold(s['SeriesName']);
  aired = s['FirstAired'] || '?';
  resLine = id + " " + name + " (since " + aired + ")";
  pr(resLine);
  if (overview) {
    printOverview(s);
    return pr('  ');
  }
};

module.exports = printSeries;


},{"./utils":15,"./watcher":16,"chalk":undefined}],14:[function(require,module,exports){
var API_HOST, BASE, BASE_STORE, KEY, _, add, all, async, available, download, error, findByEp, findEp, fs, path, readAll, readSeries, ref, rimraf, rm, series, storage, unzip, update, updateOne, xml2js;

fs = require('fs');

xml2js = require('xml2js');

async = require('async');

path = require('path');

unzip = require('unzip');

_ = require('underscore');

rimraf = require('rimraf');

ref = require('./utils'), error = ref.error, download = ref.download;

KEY = process.env.THETVDB_API_KEY;

API_HOST = 'http://thetvdb.com';

BASE = process.env['HOME'] + "/.tvcl";

BASE_STORE = BASE + "/store";

storage = {};

findEp = function(epId) {
  var episodes, ids, series;
  ids = Object.keys(storage);
  series = findByEp(epId);
  if (!series) {
    return void 0;
  }
  episodes = series['Data']['Episode'];
  return _.find(episodes, function(e) {
    return e['id'][0] === epId;
  });
};

findByEp = function(epId) {
  var id, ids;
  ids = Object.keys(storage);
  id = _.find(ids, function(id) {
    var episodes;
    episodes = storage[id]['Data']['Episode'];
    return _.some(episodes, function(e) {
      return e['id'][0] === epId;
    });
  });
  return storage[id];
};

readSeries = function(id, cb) {
  var parser, str, xml_file;
  xml_file = BASE_STORE + "/" + id + "/en.xml";
  if (!fs.existsSync(xml_file)) {
    error("Could not find the show: maybe `add` it first?");
  }
  str = fs.readFileSync(xml_file);
  parser = new xml2js.Parser();
  return parser.parseString(str, function(err, result) {
    if (err) {
      return error(err);
    }
    storage[id] = result;
    return cb('', result);
  });
};

available = function() {
  return fs.readdirSync(BASE_STORE).filter(function(f) {
    return fs.statSync(path.join(BASE_STORE, f)).isDirectory();
  });
};

readAll = function(cb) {
  if (!fs.existsSync(BASE_STORE)) {
    return error("No Series Added Yet. Try `tv lookup <title>` first. And then `tv add <id>`");
  }
  return async.map(available(), readSeries, cb);
};

series = function(id, cb) {
  if (storage[id]) {
    return cb(storage[id]);
  } else {
    return readSeries(id, function(err, res) {
      return cb(storage[id]);
    });
  }
};

add = function(id, cb) {
  var zipFile, zip_url;
  zip_url = function(id) {
    return API_HOST + "/api/" + KEY + "/series/" + id + "/all/en.zip";
  };
  if (!fs.existsSync(BASE)) {
    fs.mkdirSync(BASE);
  }
  if (!fs.existsSync(BASE_STORE)) {
    fs.mkdirSync(BASE_STORE);
  }
  zipFile = BASE_STORE + "/" + id + ".zip";
  return download(zip_url(id), zipFile, function() {
    return fs.createReadStream(zipFile).pipe(unzip.Extract({
      path: BASE_STORE + "/" + id
    })).on('close', function() {
      return cb();
    });
  });
};

rm = function(id, cb) {
  var files;
  files = [BASE_STORE + "/" + id + ".zip", BASE_STORE + "/" + id];
  return async.map(files, rimraf, cb);
};

updateOne = function(id, cb) {
  return rm(id, function() {
    return add(id, function() {
      return cb();
    });
  });
};

update = function(cb) {
  var all_series;
  all_series = available();
  return async.map(all_series, updateOne, cb);
};

all = function() {
  return Object.keys(storage).map(function(k) {
    return storage[k];
  });
};

module.exports = {
  series: series,
  readAll: readAll,
  findSeriesByEp: findByEp,
  findEp: findEp,
  add: add,
  all: all,
  rm: rm,
  update: update
};


},{"./utils":15,"async":undefined,"fs":undefined,"path":undefined,"rimraf":undefined,"underscore":undefined,"unzip":undefined,"xml2js":undefined}],15:[function(require,module,exports){
var download, error, fs, http, parseString, pr, req, xmlReq;

req = require('request');

parseString = require('xml2js').parseString;

http = require('http');

fs = require('fs');

pr = function(msg) {
  return console.log("    " + msg);
};

error = function(msg) {
  pr("" + msg);
  return process.exit(1);
};

xmlReq = function(url, cb) {
  return req(url, function(err, resp, body) {
    if (err) {
      return error("Error while req " + url + ": " + err);
    }
    if (resp.statusCode !== 200) {
      return error("Error while req " + url + ": code — " + resp.statusCode);
    }
    return parseString(body, function(err, res) {
      if (err) {
        return error("Error parsing response from " + url + ": " + err);
      }
      return cb(res);
    });
  });
};

download = function(url, to, cb) {
  var file;
  file = fs.createWriteStream(to);
  return req = http.get(url, function(resp) {
    resp.pipe(file);
    return file.on('finish', function() {
      return file.close(cb);
    });
  });
};

module.exports = {
  error: error,
  xmlReq: xmlReq,
  download: download,
  pr: pr
};


},{"fs":undefined,"http":undefined,"request":undefined,"xml2js":undefined}],16:[function(require,module,exports){
var BASE, WATCH_FILE, fs, isWatched, read, save, watch, watchFn;

fs = require('fs');

BASE = process.env['HOME'] + "/.tvcl";

WATCH_FILE = BASE + "/watch.json";

watch = void 0;

read = function() {
  return watch = fs.existsSync(WATCH_FILE) ? JSON.parse(fs.readFileSync(WATCH_FILE)) : {};
};

watchFn = function(epId) {
  if (!watch) {
    read();
  }
  return watch[epId] = true;
};

save = function() {
  if (!watch) {
    read();
  }
  return fs.writeFileSync(WATCH_FILE, JSON.stringify(watch));
};

isWatched = function(e) {
  var id;
  if (!watch) {
    read();
  }
  id = e['id'][0];
  return !!watch[id];
};

module.exports = {
  watch: watchFn,
  save: save,
  isWatched: isWatched
};


},{"fs":undefined}]},{},[11]);
