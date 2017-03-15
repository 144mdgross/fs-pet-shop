'use strict'
const fs = require('fs')
const path = require('path')
const node = path.basename(process.argv[0])
const file = path.basename(process.argv[1])
const filename = 'pets.json'
const subcommand = process.argv[2]
const subcommandIndex = process.argv[3]
let anotherRealObj
let destroyObject

if (process.argv.length < 3) {
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
}

fs.stat(`${filename}`, function(err, stats) {
  if (err) {
    console.error('Usage: node pets.js [read | create | update | destroy]')
    process.exit(1)
  }
})

if (subcommand === 'read') {
  // Asynchronously reads the entire contents of a file
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let realObj = JSON.parse(data)

    if (err) {
      throw err
      process.exit(1)
    } else if (!subcommandIndex) {
      console.log(realObj)
    } else if (!realObj[subcommandIndex]) {
      console.error(`Usage: node pets.js read INDEX`);
      process.exit(1)
    } else {
      console.log(realObj[subcommandIndex])
    }
  });
}
else if (subcommand === 'create') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      console.error('error')
      process.exit(1)
    } else if (!process.argv[5]) {
      console.error('Usage: node pets.js create AGE KIND NAME')
      process.exit(1)
    }
    anotherRealObj = JSON.parse(data)
    let petsObj = {
      age: +process.argv[3],
      kind: process.argv[4],
      name: process.argv[5]
    }
    anotherRealObj.push(petsObj)
    fs.writeFile('pets.json', JSON.stringify(anotherRealObj), (err) => {
      if (err) {
        console.error('Usage: node pets.js create AGE KIND NAME')
        process.exit(1)
      }
      console.log(anotherRealObj[anotherRealObj.length - 1])
    })
  })
}
else if (subcommand === 'update') {
  if (!process.argv[6]) {
    console.error('Usage: node pets.js update INDEX AGE KIND NAME')
    process.exit(1)
  }
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Usage: node pets.js update INDEX AGE KIND NAME')
      process.exit(1)
    }
    let updateObject = JSON.parse(data)
    let newAge = updateObject[process.argv[3]]
    newAge.age = +process.argv[4]
    newAge.kind = process.argv[5]
    newAge.name = process.argv[6]
    fs.writeFile('pets.json', JSON.stringify(updateObject), (err) => {
      if (err) {
        console.error(('Usage: node pets.js update INDEX AGE KIND NAME'))
        process.exit(1)
      }
      console.log(updateObject[process.argv[3]])
    })

  })
} else if (subcommand === 'destroy') {
  if (!process.argv[3]) {
    console.error('Usage: node pets.js destroy INDEX');
    process.exit(1)
  }
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Usage: node pets.js destroy INDEX')
      process.exit(1)
    }
    destroyObject = JSON.parse(data)
    if (destroyObject[process.argv[3]]) {
      let removed = destroyObject.splice(process.argv[3], 1);
      fs.writeFile('pets.json', JSON.stringify(destroyObject), (err) => {
        if (err) {
          console.error(('Usage: node pets.js update INDEX AGE KIND NAME'))
          process.exit(1)
        }
        console.log(removed[0])
      })
    }
  })

}
