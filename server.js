const express = require('express')
const hbs = require('express-handlebars')
const goat = require('./goat.json')
const fs = require('fs')
const rules = require('./gameLogic')

const server = express()

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
  fs.readFile('./goat.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    const theGoat = parsedData.goats.find((goat) => goat.id === id)
    rules.guess(req.body, theGoat)
    res.render('game', theGoat)
  })
})

module.exports = server
