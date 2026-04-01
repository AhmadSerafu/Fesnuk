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
    let postsJSON = JSON.parse(await fs.readFile("./data/posts.json", "utf-8"));

    postsJSON.forEach((post) => {
      delete post.id;
      post.createdAt = now;
      post.updatedAt = now;
    });

    await queryInterface.bulkInsert("Posts", postsJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
