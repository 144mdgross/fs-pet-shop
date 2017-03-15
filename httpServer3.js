'use strict'
const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 8080


const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname
  let pathArray = pathname.split('/')
  let index = pathArray[2]

  if (pathArray[1] === 'GET') {
    if (!index) {
      res.statusCode = 200
      res.setHeader("Content-type", "JSON")
      fs.readFile('pets.json', 'utf8', (err, data) => {
        if (err) throw err
        res.end(data)
      })
    } else if (index) {
      res.statusCode = 200
      res.setHeader("Content-type", "JSON")
      fs.readFile('pets.json', 'utf8', (err, data) => {
        let realData = JSON.parse(data)
        let returnData = JSON.stringify(realData[index])
        if (err) throw err
        res.end(returnData)
      })
    }
  } else {
    res.end('what are you lookin\' at?')
  }
})


server.listen(port, function() {
  console.log('may i take your order', port);
})





module.exports = server;
