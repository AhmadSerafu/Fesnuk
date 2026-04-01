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
    let commentsJSON = JSON.parse(
      await fs.readFile("./data/comments.json", "utf-8"),
    );

    commentsJSON.forEach((comment) => {
      delete comment.id;
      comment.createdAt = now;
      comment.updatedAt = now;
    });

    await queryInterface.bulkInsert("Comments", commentsJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Comments", null, {});
  },
};
