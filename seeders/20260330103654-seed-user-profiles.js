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
    let userProfilesJSON = JSON.parse(
      await fs.readFile("./data/user-profiles.json", "utf-8"),
    );

    userProfilesJSON.forEach((userProfile) => {
      delete userProfile.id;
      userProfile.createdAt = now;
      userProfile.updatedAt = now;
    });

    await queryInterface.bulkInsert("UserProfiles", userProfilesJSON, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("UserProfiles", null, {});
  },
};
