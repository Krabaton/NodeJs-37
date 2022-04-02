const catRepository = require('../../repository/cats')
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const { STATUS_HTTP } = require('../../libs/messages')

const listCats = async (req, res, next) => {
  const cats = await catRepository.listCats()
  res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { cats } })
}

const getCatById = async (req, res, next) => {
  const cat = await catRepository.getCatById(req.params.catId)
  const lang = req.app.get('lang')
  if (cat) {
    return res.json({
      status: 'success',
      code: HTTP_STATUS_CODE.OK,
      payload: { cat },
    })
  }
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
    status: 'error',
    code: HTTP_STATUS_CODE.NOT_FOUND,
    message: STATUS_HTTP.notFound[lang],
  })
}

const addCat = async (req, res, next) => {
  const cat = await catRepository.addCat(req.body)
  res.status(HTTP_STATUS_CODE.CREATED).json({
    status: 'success',
    code: HTTP_STATUS_CODE.CREATED,
    payload: { cat },
  })
}

const removeCat = async (req, res, next) => {
  try {
    const cat = await catRepository.removeCat(req.params.catId)
    if (cat) {
      return res.json({
        status: 'success',
        code: HTTP_STATUS_CODE.OK,
        payload: { cat },
      })
    }
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      status: 'error',
      code: HTTP_STATUS_CODE.NOT_FOUND,
      message: 'Not Found',
    })
  } catch (err) {
    next(err)
  }
}

const updateCat = async (req, res, next) => {
  const cat = await catRepository.updateCat(req.params.catId, req.body)
  if (cat) {
    return res.json({
      status: 'success',
      code: HTTP_STATUS_CODE.OK,
      payload: { cat },
    })
  }
  return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
    status: 'error',
    code: HTTP_STATUS_CODE.NOT_FOUND,
    message: 'Not Found',
  })
}

module.exports = { listCats, getCatById, removeCat, addCat, updateCat }
