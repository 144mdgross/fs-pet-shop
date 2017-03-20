'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require('path');
const fs = require('fs')
const usersPath = path.join(__dirname, '../users.json');
const arg1 = process.argv[2]
const method = process.argv[3]
const ageData = process.argv[5]
const kindData = process.argv[6]
const nameData = process.argv[7]

app.disable('x-powered-by');

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
    res.set('Content-Type', 'application/json')
    res.send(pets[id])
  })
})

if(ageData){

app.post('/pets', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }
    let pets = JSON.parse(data)
    let petObj = {
      age: +ageData.substring(4),
      kind: kindData.substring(5),
      name: nameData.substring(5)
    }
  pets.push(petObj)
  console.log(pets);
  fs.writeFile('pets.json', JSON.stringify(pets), (err) =>{
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }
  })
  let petString = JSON.stringify(petObj)
  res.send(petString)
})
})
}
app.use((req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log('may I take your order', port);
})

module.exports = app
