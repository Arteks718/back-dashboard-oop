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
      ip_address: {
        type: DataTypes.STRING,
        validate: {
          isIPv4: true,
        },
      },
      user_id: {
        type: DataTypes.NUMBER,
        validate: {
          max: 13,
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["checked", "unchecked", "spam"],
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
