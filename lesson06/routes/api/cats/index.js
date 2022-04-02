const express = require('express')
const {
  listCats,
  getCatById,
  addCat,
  removeCat,
  updateCat,
} = require('../../../controllers/cats')
const {
  schemaCreateCat,
  schemaVaccinatedCat,
  schemaMongoId,
} = require('./cats-validation-schemes')
const {
  validateBody,
  validateParams,
} = require('../../../middlewares/validation')
const guard = require('../../../middlewares/guard')
const router = express.Router()

router.get('/', guard, listCats)

router.get('/:catId', guard, validateParams(schemaMongoId), getCatById)

router.post('/', guard, validateBody(schemaCreateCat), addCat)

router.delete('/:catId', guard, validateParams(schemaMongoId), removeCat)

router.put('/:catId', guard, validateParams(schemaMongoId), updateCat)

router.patch(
  '/:catId/vaccinated',
  guard,
  [validateParams(schemaMongoId), validateBody(schemaVaccinatedCat)],
  updateCat,
)

module.exports = router
