const express = require('express')
const router = express.Router()

router
  .get('/', (req, res) => {
    res.send('Hello World!')
  })
  .post('/', (req, res) => {
    res.send('POST method')
  })
  .put('/', (req, res) => {
    res.send('PUT method')
  })
  .delete('/', (req, res) => {
    res.send('DELETE method')
  })

module.exports = router
