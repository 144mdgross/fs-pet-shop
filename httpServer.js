'use strict'
const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 8000

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname
  let pathArray = pathname.split('/')
  let index = pathArray[2]

  if (pathArray[1] === 'pets' && !index) {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    fs.readFile('pets.json', 'utf8', (err, data) => {
      if (err) throw err
      res.end(data)
    })
  } else if (pathArray[1] === 'pets' && index) {

    fs.readFile('pets.json', 'utf8', (err, data) => {
      if (err) throw err
      let realData = JSON.parse(data)
      let returnData = JSON.stringify(realData[index])
      if (returnData) {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(returnData)
      } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Not Found')
      }
    })
  } else {
    res.statusCode = 404
    res.setHeader = ('Content-Type', 'text/plain')
    res.end('what are you lookin\' at?')
  }
})
server.listen(port, function() {
  console.log('may i take your order');
})
module.exports = server
