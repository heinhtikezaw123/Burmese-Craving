"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      photo: DataTypes.STRING,
      password: DataTypes.STRING,
      commission: DataTypes.INTEGER,
      otp: DataTypes.STRING,
      status: DataTypes.ENUM("active", "inactive"),
      is_modified: DataTypes.BOOLEAN,
      otp_expire: DataTypes.DATE,
      is_verify: DataTypes.BOOLEAN,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      paranoid: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return User;
};
