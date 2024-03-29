"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leads extends Model {
    static associate(models) {
      Leads.belongsTo(models.SalesManagers, {
        foreignKey: 'salesManagerId',
      });
    }
  }
  Leads.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          max: 64,
        },
      },
      ipAddress: {
        type: DataTypes.STRING,
        validate: {
          isIPv4: true,
        },
      },
      userId: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [12, 14]
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["checked", "unchecked", "spam"],
        defaultValue: "unchecked"
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: "Leads",
    }
  );
  return Leads;
};
