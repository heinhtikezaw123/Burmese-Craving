"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate(models) {
      // define association here
    }
  }

  Test.init(
    {
      // String types
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
      },
      countryCode: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },

      // Number types
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accountBalance: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.0,
      },
      rating: {
        type: DataTypes.FLOAT,
      },

      // Boolean type
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      // Date types
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
      },

      // Enum type
      userRole: {
        type: DataTypes.ENUM("admin", "user", "guest"),
        defaultValue: "user",
      },

      // JSON type
      preferences: {
        type: DataTypes.JSON,
      },

      // UUID type
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      // Binary type
      profilePicture: {
        type: DataTypes.BLOB("long"),
      },

      // Array type (PostgreSQL only)
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

      // Geometry type (PostgreSQL, MySQL)
      location: {
        type: DataTypes.JSON,
        // store like { lat: ..., lng: ... }
      },
    },
    {
      sequelize,
      tableName: "Tests",
      timestamps: true,
      paranoid: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Test;
};
