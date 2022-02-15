const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const fs = require('fs/promises')

app.use(express.json())

app.use((req, res, next) => {
  const start = performance.now()
  // console.log('Our middleware')
  // if (req.body.name === 'Alex') {
  //   return res.json({ message: 'Hello Alex' })
  // }
  next()
  console.log(`${req.method} ${req.originalUrl}: ${performance.now() - start}`)
})

// app.use(express.urlencoded({ extended: true })) // Forms

app.use('/', require('./routes/main'))
app.use('/users', require('./routes/users'))
app.use('/weather', require('./routes/weather'))

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

app.use(async (err, req, res, next) => {
  await fs.appendFile(
    'error.log',
    `${req.method} ${req.originalUrl}: ${err.message}\n`,
  )
  res.status(500).json({ message: err.message })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
