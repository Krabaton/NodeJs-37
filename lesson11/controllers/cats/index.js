const { HTTP_STATUS_CODE } = require('../../libs/constants')

const catsService = require('../../services/cats')

const listCats = async (req, res) => {
  const cats = await catsService.getAll(req.query, req.user)
  res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { ...cats },
  })
}

const getCatById = async (req, res) => {
  const cat = await catsService.getById(req.params.catId, req.user)
  return res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { cat },
  })
}

const addCat = async (req, res) => {
  const cat = await catsService.create(req.body, req.user)
  res.status(HTTP_STATUS_CODE.CREATED).json({
    status: 'success',
    code: HTTP_STATUS_CODE.CREATED,
    payload: { cat },
  })
}

const removeCat = async (req, res) => {
  const cat = await catsService.remove(req.params.catId, req.user)
  return res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { cat },
  })
}

const updateCat = async (req, res, next) => {
  const cat = await catsService.update(req.params.catId, req.body, req.user)
  return res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { cat },
  })
}

const getStatistics = async (req, res) => {
  const result = await catsService.getStatistics(req.user)
  return res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { ...result },
  })
}

module.exports = {
  listCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
  getStatistics,
}
