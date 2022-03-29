const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { LIMIT_AGE_CAT } = require('../libs/constants')
const { STATUS_CAT } = require('../libs/messages')

const catSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    age: { type: Number, min: LIMIT_AGE_CAT.min, max: LIMIT_AGE_CAT.max },
    isVaccinated: { type: Boolean, default: false },
    date: { type: Date, default: () => Date.now() },
    features: { type: [String], set: (data) => data || [] },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id
        delete ret.isVaccinated
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)

catSchema.virtual('status').get(function () {
  return this.isVaccinated
    ? STATUS_CAT.VACCINATED.en
    : STATUS_CAT.NOT_VACCINATED.en
})

const Cat = model('cat', catSchema)

module.exports = Cat
