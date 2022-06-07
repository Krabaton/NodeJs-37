const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/cats', require('./cats'))

module.exports = router
