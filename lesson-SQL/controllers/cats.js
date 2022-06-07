const Cats = require('../repositories/cats')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { cats, total, limit, offset } = await Cats.getAll(userId, req.query)
    return res.json({
      status: 'success',
      code: 200,
      data: { cats, total, limit, offset },
    })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.getById(userId, req.params.id)
    if (cat) {
      console.log(cat)
      return res.json({ status: 'success', code: 200, data: { cat } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.create(userId, req.body)
    return res.status(201).json({ status: 'success', code: 201, data: { cat } })
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.remove(userId, req.params.id)
    if (cat) {
      return res.json({ status: 'success', code: 200, data: { cat } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user.id
    const cat = await Cats.update(userId, req.params.id, req.body)
    if (cat) {
      return res.json({ status: 'success', code: 200, data: { cat } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
