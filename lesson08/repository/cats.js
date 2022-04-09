const Cat = require('../models/cat')
const { Types } = require('mongoose')
// const listCats = async ({ limit, skip, sortCriteria, select }, user) => {
//   const total = await Cat.countDocuments({ owner: user.id })
//   const results = await Cat.find({ owner: user.id })
//     .select(select)
//     .skip(skip)
//     .limit(limit)
//     .sort(sortCriteria)
//   return { total, results }
// }

const listCats = async ({ limit, skip, sortCriteria, select }, user) => {
  const { docs: cats, ...rest } = await Cat.paginate(
    { owner: user.id },
    { limit, offset: skip, sort: sortCriteria, select },
  )
  return { cats, ...rest }
}

const getCatById = async (catId, user) => {
  const result = await Cat.findOne({ _id: catId, owner: user.id }).populate({
    path: 'owner',
    select: 'name email role createdAt',
  })
  return result
}

const removeCat = async (catId, user) => {
  const result = await Cat.findOneAndRemove({ _id: catId, owner: user.id })
  return result
}

const addCat = async (body, user) => {
  const result = await Cat.create({ ...body, owner: user.id })
  return result
}

const updateCat = async (catId, body, user) => {
  const result = await Cat.findOneAndUpdate(
    { _id: catId, owner: user.id },
    { ...body },
    { new: true },
  )
  return result
}

const getStatistics = async (user) => {
  const result = await Cat.aggregate([
    {
      $match: { owner: Types.ObjectId(user.id) },
    },
    {
      $group: {
        _id: '$status',
        sumAge: { $sum: '$age' },
        maxAge: { $max: '$age' },
        minAge: { $min: '$age' },
        avgAge: { $avg: '$age' },
        count: { $sum: 1 },
      },
    },
  ])
  return result
}

module.exports = {
  listCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
  getStatistics,
}
