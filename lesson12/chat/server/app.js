const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: '*' },
})

app.use('*', (_req, res) => {
  res.send('Welcome to our WebSocket Server!')
})

let users = {}

io.on('connection', (socket) => {
  console.log(socket.handshake)
  const broadcast = (event, data) => {
    socket.emit(event, data)
    socket.broadcast.emit(event, data)
  }
  users[socket.id] = 'Anonim'
  broadcast('users', users)

  socket.on('message', (message) => {
    console.log(message)
    broadcast('message', message)
  })
  socket.on('disconnect', () => {
    delete users[socket.id]
    broadcast('users', users)
  })
  socket.on('change:name', (name) => {
    users[socket.id] = name
    broadcast('users', users)
  })
})

httpServer.listen(process.env.PORT || 5000)
