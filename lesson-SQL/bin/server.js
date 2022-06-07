const app = require('../app')
const db = require('../models')

const PORT = process.env.PORT || 3000

db.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((e) => {
    console.log(`Error: ${e.message}`)
  })
