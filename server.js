const express = require('express')
const hbs = require('express-handlebars')
const goat = require('./goat.json')
const fs = require('fs')
// const guess = require('./gameLogic')

const server = express()

index = {
  na: 'North America',
  sa: 'Africa',
  eu: 'Europe',
  sas: 'Asia',
  oce: 'Oceania',
}

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// routers
// homepage
server.get('/', (req, res) => {
  res.render('home')
})

server.get('/goat/:id', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile('./goat.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    const theGoat = parsedData.goats.find((goat) => goat.id === id)
    theGoat.nextID = id + 1
    console.log(theGoat)
    //add netx goat id to obj, then go from there
    res.render('game', theGoat)
  })
})

server.post('/goat/:id', (req, res) => {
  const id = Number(req.params.id)

  function guess(form, theGoat, res) {
    if (index[form.goats] == theGoat.location) {
      res.render('game-success', theGoat)
    } else {
      res.render('game-failure', theGoat)
    }
    return
  }

  fs.readFile('./goat.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    const theGoat = parsedData.goats.find((goat) => goat.id === id)
    guess(req.body, theGoat, res)
  })
})

server.post('/goat/:id', (req, res) => {
  const id = Number(req.params.id) + 1
  console.log(id)
  // fs.readFile('./goat.json', 'utf-8', (err, data) => {
  //   if (err) return res.status(500).send(err.message)
  //   const parsedData = JSON.parse(data)
  //   const theGoat = parsedData.goats.find((goat) => goat.id === id)
  res.redirect('/goat/' + id)
  // })
})

module.exports = server
