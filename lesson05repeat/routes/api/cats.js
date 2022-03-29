const express = require('express')
const {
  listCats,
  getCatById,
  addCat,
  removeCat,
  updateCat,
} = require('../../controllers/cats')
const {
  schemaCreateCat,
  schemaVaccinatedCat,
  schemaMongoId,
} = require('./cats-validation-schemes')
const { validateBody, validateParams } = require('../../middlewares/validation')
const router = express.Router()

router.get('/', listCats)

router.get('/:catId', validateParams(schemaMongoId), getCatById)

router.post('/', validateBody(schemaCreateCat), addCat)

router.delete('/:catId', validateParams(schemaMongoId), removeCat)

router.put('/:catId', validateParams(schemaMongoId), updateCat)

router.patch(
  '/:catId/vaccinated',
  [validateParams(schemaMongoId), validateBody(schemaVaccinatedCat)],
  updateCat,
)

module.exports = router
