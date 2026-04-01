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
    let likesJSON = JSON.parse(await fs.readFile("./data/likes.json", "utf-8"));

    likesJSON.forEach((like) => {
      delete like.id;
      like.createdAt = now;
      like.updatedAt = now;
    });

    await queryInterface.bulkInsert("Likes", likesJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Likes", null, {});
  },
};
