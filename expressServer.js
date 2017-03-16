'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require('path');
const fs = require('fs')
const usersPath = path.join(__dirname, '../users.json');
const arg1 = process.argv[2]
const method = process.argv[3]

//  not sure what this does. delete if breaks
app.disable('x-powered-by');

//  handle a get request from this response

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }
    let jsonData = JSON.parse(data)
    res.send(jsonData)
  })

})

app.get('/pets/:id', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }

    let id = +req.params.id
    let pets = JSON.parse(data)

    if(id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    res.set('Content-Type', 'text/plain')
    res.send(pets[id])
  })
})

//  if it's not handled elsewhere it's their fault :p
app.use((req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log('may I take your order', port);
})
