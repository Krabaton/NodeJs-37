const express = require('express')
const {
  listCats,
  getCatById,
  addCat,
  removeCat,
  updateCat,
  getStatistics,
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
const role = require('../../../middlewares/role')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const { Role } = require('../../../libs/constants')
const router = express.Router()

router.get('/', guard, listCats)

router.get('/statistics', guard, role(Role.ADMIN), getStatistics)

router.get(
  '/:catId',
  guard,
  validateParams(schemaMongoId),
  wrapperError(getCatById),
)

router.post('/', guard, validateBody(schemaCreateCat), wrapperError(addCat))

router.delete(
  '/:catId',
  guard,
  validateParams(schemaMongoId),
  wrapperError(removeCat),
)

router.put(
  '/:catId',
  guard,
  validateParams(schemaMongoId),
  wrapperError(updateCat),
)

router.patch(
  '/:catId/vaccinated',
  guard,
  [validateParams(schemaMongoId), validateBody(schemaVaccinatedCat)],
  wrapperError(updateCat),
)

module.exports = router
