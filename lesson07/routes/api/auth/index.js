const express = require('express')
const { registration, login, logout } = require('../../../controllers/auth')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const router = express.Router()
const guard = require('../../../middlewares/guard')
const limiter = require('../../../middlewares/rate-limit')

router.post(
  '/registration',
  limiter(15 * 60 * 1000, 2),
  wrapperError(registration),
)
router.post('/login', wrapperError(login))
router.post('/logout', guard, wrapperError(logout))

module.exports = router
