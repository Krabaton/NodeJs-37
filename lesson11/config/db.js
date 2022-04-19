const mongoose = require('mongoose')
let uri

if (process.env.NODE_ENV === 'test') {
  uri = process.env.URI_DB_TEST
} else {
  uri = process.env.URI_DB
}

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

if (process.env.NODE_ENV !== 'test') {
  mongoose.connection.on('connected', () => {
    console.log('Connected to DB')
  })

  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from DB')
  })
}

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Disconnected from DB')
    process.exit(1)
  })
})

module.exports = db
