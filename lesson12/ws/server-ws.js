const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const clients = []

wss.on('connection', (ws) => {
  const id = clients.length
  clients[id] = ws
  console.log(`New connection ${id}`)

  ws.send(
    JSON.stringify({
      type: 'greeting',
      message: `Hi you id equals ${id}`,
      id: id,
    }),
  )

  ws.on('message', (message) => {
    // TODO: sanitize message https://www.npmjs.com/package/sanitize-html
    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'message',
          message: message.toString(),
          id: id,
        }),
      )
    })
  })

  ws.on('close', () => {
    delete clients[id]
    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'info',
          message: `We have lost connection ${id}`,
          id: id,
        }),
      )
    })
  })
})
