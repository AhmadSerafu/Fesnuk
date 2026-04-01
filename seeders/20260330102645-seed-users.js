"use strict";
const fs = require("fs").promises;
const bcrypt = require("bcryptjs");

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
    let usersJSON = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));

    usersJSON.forEach((user) => {
      delete user.id;
      user.password = bcrypt.hashSync(user.password, 10); // ← sync, aman di forEach
      user.createdAt = now;
      user.updatedAt = now;
    });

    await queryInterface.bulkInsert("Users", usersJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Users", null, {});
  },
};
