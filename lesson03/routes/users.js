const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.query)
  res.send('Users route')
})

router.get('/throw', (req, res, next) => {
  // const err = new Error('Our DB crashed!!!!')
  // throw err
  return next(new Error('Our DB crashed!!!!'))
  res.send('Users throw')
})

router.get('/:id', (req, res) => {
  console.log(req.params)
  res.send('Users route')
})

//localhost:3000/users/test/ct

router.get('/:userid/ct/:order', (req, res) => {
  console.log(req.params)
  res.send('Users route')
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.send('POST method')
})

module.exports = router
