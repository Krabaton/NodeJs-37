'use strict'
const { Gender } = require('../helpers/constants')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Genders',
      [
        {
          name: Gender.MALE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Gender.FEMALE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Gender.NONE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Genders', null, {})
  },
}
