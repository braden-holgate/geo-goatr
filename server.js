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

server.get('/', (req, res) => {
  res.render('<h1>Dont look now goats are getting dressed</h1>')
})

server.get('/goat/:id', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile('./goat.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    const theGoat = parsedData.goats.find((goat) => goat.id === id)
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

// server.post('/goat/:id', (req, res) => {
//   const id = Number(req.params.id) + 1
//   console.log(id)
//   // fs.readFile('./goat.json', 'utf-8', (err, data) => {
//   //   if (err) return res.status(500).send(err.message)
//   //   const parsedData = JSON.parse(data)
//   //   const theGoat = parsedData.goats.find((goat) => goat.id === id)
//   res.redirect('/goat/' + id)
//   // })
// })

module.exports = server
