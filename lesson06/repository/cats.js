const Cat = require('../models/cat')

const listCats = async () => {
  const result = await Cat.find()
  return result
}

const getCatById = async (catId) => {
  const result = await Cat.findOne({ _id: catId }) // Cat.findById(catId)
  return result
}

const removeCat = async (catId) => {
  const result = await Cat.findOneAndRemove({ _id: catId })
  return result
}

const addCat = async (body) => {
  const result = await Cat.create(body)
  return result
}

const updateCat = async (catId, body) => {
  const result = await Cat.findOneAndUpdate(
    { _id: catId },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
}
