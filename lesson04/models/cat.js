const { randomUUID } = require('crypto')
const DB = require('./db')
const db = new DB('cats.json')

const listCats = async () => {
  return await db.read()
}

const getCatById = async (catId) => {
  const cats = await db.read()
  const [cat] = cats.filter((cat) => cat.id === catId)
  return cat
}

const removeCat = async (catId) => {
  const cats = await db.read()
  const index = cats.findIndex((cat) => cat.id === catId)
  if (index !== -1) {
    const [cat] = cats.splice(index, 1)
    await db.write(cats)
    return cat
  }
  return null
}

const addCat = async (body) => {
  const cats = await db.read()
  const newCat = {
    id: randomUUID(),
    isVaccinated: false,
    ...body,
  }
  cats.push(newCat)
  await db.write(cats)
  return newCat
}

const updateCat = async (catId, body) => {
  const cats = await db.read()
  const index = cats.findIndex((cat) => cat.id === catId)
  if (index !== -1) {
    cats[index] = { ...cats[index], ...body }
    await db.write(cats)
    return cats[index]
  }
  return null
}

module.exports = {
  listCats,
  getCatById,
  removeCat,
  addCat,
  updateCat,
}
