const express = require('express')
const { registration, login, logout } = require('../../../controllers/auth')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const router = express.Router()
const guard = require('../../../middlewares/guard')

router.post('/registration', wrapperError(registration))
router.post('/login', wrapperError(login))
router.post('/logout', guard, wrapperError(logout))

module.exports = router
