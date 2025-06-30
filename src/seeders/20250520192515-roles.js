"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamps = new Date();

    await queryInterface.bulkInsert("roles", [
      { name: "Super Admin", created_at: timestamps, updated_at: timestamps },
      { name: "Vendor", created_at: timestamps, updated_at: timestamps },
      { name: "User", created_at: timestamps, updated_at: timestamps },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", {
      name: ["Super Admin", "Vendor", "User"],
    });
  },
};
