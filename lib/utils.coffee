req = require('request')
{parseString} = require 'xml2js'
http = require('http')
fs = require('fs')

error = (msg) ->
  console.log("#{msg}")
  process.exit(1)

xmlReq = (url, cb) ->
  req url, (err, resp, body) ->
    return error("Error while req #{url}: #{err}") if err
    return error("Error while req #{url}: code — #{resp.statusCode}") if resp.statusCode != 200

    parseString body, (err, res) ->
      return error("Error parsing response from #{url}: #{err}") if err
      cb(res)

download = (url, to, cb) ->
  file = fs.createWriteStream(to)
  req = http.get url, (resp) ->
    resp.pipe(file)
    file.on 'finish', ->
      file.close(cb)

module.exports =
  error: error
  xmlReq: xmlReq
  download: download
