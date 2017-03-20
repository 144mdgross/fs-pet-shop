
'use strict'

const bodyParser = require('body-parser')
const morgan = require('morgan');
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require('path');
const fs = require('fs')

app.disable('x-powered-by')

app.post('/pets/')
app.set('port', process.env.PORT || 5000)
app.use(morgan('short'))
app.use(bodyParser.json())

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack)

      return res.sendStatus(500)
    }
    const jsonData = JSON.parse(data)

    res.send(jsonData)
  })
})

app.get('/pets/:index', (req, res) => {
  const index = +req.params.index

  fs.readFile('pets.json', 'utf8', (err, data) => {
    const pets = JSON.parse(data)

    if (err) {
      console.error(err.stack)

      return res.sendStatus(500)
    }
    if (Number.isNaN(index) || index < 0 || index >= pets.length) {
      return res.sendStatus(404)
    }
    res.send(pets[index])
  })
})

app.post('/pets', (req, res) => {
  const newPetAge = req.body.age
  const newPetKind = req.body.kind
  const newPetName = req.body.name

  if (!newPetName || !newPetKind || !newPetAge) {
    return res.sendStatus(400)
  }

  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) throw err
    const pets = JSON.parse(data)
    const petObj = {
      age: +newPetAge,
      kind: newPetKind,
      name: newPetName
    }

    pets.push(petObj)

    fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
      if (err) {
        console.error(err.stack)

        return res.sendStatus(500)
      }
    })
    res.send(petObj)
  })
})

app.patch('/pets/:id', (req, res) => {
  const id = +req.params.id

  const petAge = +req.body.age
  const petKind = req.body.kind
  const petName = req.body.name

  fs.readFile('pets.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err.stack)

      return res.sendStatus(500)
    }
    const pets = JSON.parse(data)

    for (let i = 0; i < pets.length; i++) {
      const currentPet = pets[i]

      for (let key in currentPet) {
        if (key === 'age' && petAge) {
          currentPet.age = petAge
        } else if (key === 'kind' && petKind) {
          currentPet.kind = petKind
        } else if (key === 'name' && petName) {
          currentPet.name = petName
        }
      }
    }
    fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
      if (err) {
        console.error(err.stack)

        return res.sendStatus(500)
      }
    })
    res.send(pets[id])
  })
})

app.delete('/pets/:id', (req, res) => {
  const id = +req.params.id

  fs.readFile('pets.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err.stack)

      return res.sendStatus(500)
    }
    const pets = JSON.parse(data)

    if (pets[id]) {
      const removed = pets.splice(id, 1)

      fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
        if (err) {
          console.error(err.stack)

          return res.sendStatus(500)
        }
      })

      res.send(removed[0])
    } else {
      res.sendStatus(404)
    }
  })
})


app.use((req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log('may I take your order', port);
})

module.exports = app
