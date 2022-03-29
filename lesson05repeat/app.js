const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const catsRouter = require('./routes/api/cats')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short' // process.env.NODE_ENV

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  app.set('lang', req.acceptsLanguages(['en', 'uk']) || 'en')
  next()
})

app.use('/api/cats', catsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
