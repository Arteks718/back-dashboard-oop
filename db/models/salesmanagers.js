'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesManagers extends Model {
    static associate(models) {
      SalesManagers.belongsTo(models.Leads, {
        foreignKey: 'sales_managers_id'
      })
    }
  }
  SalesManagers.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 128]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'SalesManagers',
  });
  return SalesManagers;
};