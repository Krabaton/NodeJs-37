const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/cats')
const guard = require('../../../helpers/guard')

const {
  validationCreateCat,
  validationUpdateCat,
  validationUpdateStatusCat,
} = require('./validation')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router
  .get('/', guard, ctrl.getAll)
  .post('/', guard, validationCreateCat, ctrl.create)

router
  .get('/:id', guard, ctrl.getById)
  .delete('/:id', guard, ctrl.remove)
  .put('/:id', guard, validationUpdateCat, ctrl.update)

router.patch('/:id/vaccinated', guard, validationUpdateStatusCat, ctrl.update)

module.exports = router
