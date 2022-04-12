/* eslint-disable prefer-regex-literals */
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schemaCreateCat = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Поле name обязательное',
    'string.empty': 'Поле name не может быть пустым',
  }),
  age: Joi.string()
    .pattern(/[0-9]+/)
    .required(),
  isVaccinated: Joi.boolean().optional(),
})

const schemaVaccinatedCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
}).messages({ 'object.unknown': 'Поле {{#label}} не разрешено' })

const schemaMongoId = Joi.object({
  catId: Joi.objectId().required(),
})

module.exports = { schemaCreateCat, schemaVaccinatedCat, schemaMongoId }
