const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// First DB - main DB (used for migrations, seeding, etc.)
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
  }
);

module.exports = { db };
