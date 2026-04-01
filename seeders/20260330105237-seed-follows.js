"use strict";
const fs = require("fs").promises;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const now = new Date();
    let followsJSON = JSON.parse(
      await fs.readFile("./data/follows.json", "utf-8"),
    );

    followsJSON.forEach((follow) => {
      delete follow.id;
      follow.createdAt = now;
      follow.updatedAt = now;
    });

    await queryInterface.bulkInsert("Follows", followsJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Follows", null, {});
  },
};
