'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Gender, {
        foreignKey: 'gender',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      User.hasMany(models.Cat, { foreignKey: 'owner' })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING,
      gender: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
