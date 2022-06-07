'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    static associate(models) {
      Cat.belongsTo(models.User, {
        foreignKey: 'owner',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  Cat.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      isVaccinated: { type: DataTypes.BOOLEAN, defaultValue: false },
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cat',
    },
  )
  return Cat
}
