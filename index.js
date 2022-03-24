const server = require('./server')

const port = 3000

server.listen(port, function () {
  console.log('server is listening on port', port)
})
