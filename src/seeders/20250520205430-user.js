"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash("Password123", 10);
    const now = new Date();

    const users = [
      { name: "Super Admin", email: "admin@burmesecraving.com", role_id: 1 },
      { name: "Vendor", email: "saleadmin@burmesecraving.com", role_id: 2 },
      {
        name: "User",
        email: "user@burmesecraving.com",
        role_id: 3,
      },
    ].map((user) => ({
      ...user,
      password: passwordHash,
      is_verify: true,
      status: "active",
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: [
        "admin@burmesecraving.com",
        "saleadmin@burmesecraving.com",
        "user@burmesecraving.com",
      ],
    });
  },
};
