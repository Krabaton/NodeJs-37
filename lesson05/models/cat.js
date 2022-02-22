const { ObjectId } = require('mongodb')
const DB = require('./db')

const getCollection = async (db, nameCollection) => {
  const client = await db
  const collection = await client.db().collection(nameCollection)
  return collection
}

const listCats = async () => {
  const collection = await getCollection(DB, 'cats')
  const result = await collection.find().toArray()
  console.log(result)
  return result
}

const getCatById = async (catId) => {
  const collection = await getCollection(DB, 'cats')
  const objId = new ObjectId(catId)
  console.log(objId.getTimestamp())
  const [result] = await collection.find({ _id: objId }).toArray()
  return { ...result, createdAt: objId.getTimestamp() }
}

const removeCat = async (catId) => {
  const collection = await getCollection(DB, 'cats')
  const objId = new ObjectId(catId)
  const { value: result } = await collection.findOneAndDelete({ _id: objId })
  return result
}

const addCat = async (body) => {
  const collection = await getCollection(DB, 'cats')
  const newCat = {
    isVaccinated: false,
    ...body,
  }
  const result = await collection.insertOne(newCat)
  console.log(result)
  return await getCatById(result.insertedId)
}

const updateCat = async (catId, body) => {
  const collection = await getCollection(DB, 'cats')
  const objId = new ObjectId(catId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { returnDocument: 'after' },
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
