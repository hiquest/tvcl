const req = require('request');
const {parseString} = require('xml2js');
const http = require('http');
const fs = require('fs');

function pr(msg = "") {
  console.log(`    ${msg}`);
}

function error(msg) {
  pr(" ");
  pr(msg);
  pr(" ");
  process.exit(1);
}

function xmlReq(url, cb) {
  req(url, (err, resp, body) => {
    if (err) {
      return error(`Error while req ${url}: ${err}`);
    }
    if (resp.statusCode != 200) {
      return error(`Error while req ${url}: code — ${resp.statusCode}`);
    }
    parseString(body, (err, res) => {
      if (err) {
        return error(`Error parsing response from ${url}: ${err}`);
      }
      cb(res);
    });
  });
}

function download(url, to, cb) {
  const file = fs.createWriteStream(to);
  http.get(url, (resp) => {
    resp.pipe(file);
    file.on('finish', () => file.close(cb) );
  });
}

module.exports = {error, xmlReq, download, pr};
