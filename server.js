const express = require('express')
const hbs = require('handlebars')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
// server.engine('hbs', hbs({ extname: 'hbs' }))
// server.set('view engine', 'hbs')

// routers

server.get('/', (req, res) => {
  res.send('<h1>Dont look now goats are getting dressed</h1>')
})

module.exports = server
