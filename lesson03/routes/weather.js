const express = require('express')
const router = express.Router()
require('dotenv').config()

router.get('/', async (req, res, next) => {
  const { got } = await import('got')

  const apiId = process.env.API_KEY_WEATHER
  const { lat, lon } = req.query
  try {
    const response = await got(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        searchParams: {
          lat,
          lon,
          appid: apiId,
        },
      },
    ).json()

    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
