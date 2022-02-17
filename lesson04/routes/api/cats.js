const express = require('express')
const catModel = require('../../models/cat')
const {
  schemaCreateCat,
  schemaVaccinatedCat,
} = require('./cats-validation-schemes')
const { validateBody } = require('../../middlewares/validation')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const cats = await catModel.listCats()
  res.json({ status: 'success', code: 200, payload: { cats } })
})

router.get('/:catId', async (req, res, next) => {
  const cat = await catModel.getCatById(req.params.catId)
  if (cat) {
    return res.json({ status: 'success', code: 200, payload: { cat } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
})

router.post('/', validateBody(schemaCreateCat), async (req, res, next) => {
  const cat = await catModel.addCat(req.body)
  res.status(201).json({ status: 'success', code: 201, payload: { cat } })
})

router.delete('/:catId', async (req, res, next) => {
  const cat = await catModel.removeCat(req.params.catId)
  if (cat) {
    return res.json({ status: 'success', code: 200, payload: { cat } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
})

router.put('/:catId', async (req, res, next) => {
  const cat = await catModel.updateCat(req.params.catId, req.body)
  if (cat) {
    return res.json({ status: 'success', code: 200, payload: { cat } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
})

router.patch(
  '/:catId/vaccinated',
  validateBody(schemaVaccinatedCat),
  async (req, res, next) => {
    const cat = await catModel.updateCat(req.params.catId, req.body)
    if (cat) {
      return res.json({ status: 'success', code: 200, payload: { cat } })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' })
  },
)

module.exports = router
