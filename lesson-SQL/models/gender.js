'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    static associate(models) {
      Gender.hasMany(models.User, { foreignKey: 'gender' })
    }
  }
  Gender.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Gender',
    },
  )
  return Gender
}
