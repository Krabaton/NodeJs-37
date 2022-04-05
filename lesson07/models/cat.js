const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
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

catSchema.plugin(mongoosePaginate)
const Cat = model('cat', catSchema)

module.exports = Cat
