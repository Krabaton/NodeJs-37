const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.URI_DB

const db = MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

process.on('SIGINT', async () => {
  console.log('Disconnected from DB')
  const client = await db
  console.log('---1---')
  await client.close()
  console.log('---2---')
  process.exit(1)
})

module.exports = db
