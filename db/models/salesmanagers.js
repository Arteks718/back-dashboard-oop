'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SalesManagers extends Model {
    static associate(models) {
      SalesManagers.hasMany(models.Leads, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: {
          name: "salesManagerId",
          type: DataTypes.STRING,
          allowNull: true,
        },
      });
    }
  }

  SalesManagers.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 128],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'SalesManagers',
    }
  );

  return SalesManagers;
};