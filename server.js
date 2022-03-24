const express = require('express')
const hbs = require('express-handlebars')
const goat = require('./goat.json')
const fs = require('fs')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// routers

server.get('/', (req, res) => {
  res.send('<h1>Dont look now goats are getting dressed</h1>')
})

server.get('/goat/:id?', (req, res) => {
  const id = Number(req.params.id)
  fs.readFile('./goat.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).send(err.message)
    const parsedData = JSON.parse(data)
    const theGoat = parsedData.goats.find((goat) => goat.id === id)
    res.render('game', theGoat)
  })
})

module.exports = server
