const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const limiter = require('./middlewares/rate-limit')

const catsRouter = require('./routes/api/cats')
const authRouter = require('./routes/api/auth')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short' // process.env.NODE_ENV

// Apply the rate limiting middleware to all requests
app.use(limiter(15 * 60 * 1000, 100))
app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use((req, res, next) => {
  app.set('lang', req.acceptsLanguages(['en', 'uk']) || 'en')
  next()
})

app.use('/api/auth', authRouter)
app.use('/api/cats', catsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
