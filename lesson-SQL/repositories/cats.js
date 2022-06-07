const { Cat, User, Gender } = require('../models')

const getAll = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    vaccinated = null,
    limit = 5,
    offset = 0,
  } = query
  const options = {
    offset,
    limit,
    where: {
      owner: userId,
      ...(vaccinated !== null ? { isVaccinated: vaccinated } : {}),
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email', 'gender'],
        include: { model: Gender, attributes: ['name'] },
      },
    ],
  }
  const order = []
  if (sortBy) {
    order.push([`${sortBy}`])
    options.order = order
  }
  if (sortByDesc) {
    order.push([`${sortByDesc}`, 'DESC'])
    options.order = order
  }
  if (filter) {
    const attributes = filter.split('|')
    options.attributes = attributes
  }
  const { count, rows } = await Cat.findAndCountAll(options)
  return { cats: rows, total: count, limit, offset }
}

const getById = async (userId, id) => {
  const result = await Cat.findOne({ where: { id, owner: userId } })
  return result
}

const remove = async (userId, id) => {
  const cat = await getById(userId, id)
  if (cat) {
    await Cat.destroy({ where: { id, owner: userId } })
    return cat
  }
  return null
}

const create = async (userId, body) => {
  const result = await Cat.create({ owner: userId, ...body })
  return result
}

const update = async (userId, id, body) => {
  await Cat.update(body, { where: { id, owner: userId } })
  return await getById(userId, id)
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
