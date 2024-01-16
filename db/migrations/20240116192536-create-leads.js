'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 128]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      country: {
        type: Sequelize.STRING,
        validate: {
          max: 64
        }
      },
      ip_address: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      user_id: {
        type: Sequelize.STRING,
        validate: {
          max: 13
        }
      },
      sales_manager_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: "SalesManagers", 
          key: "id",
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }
      },
      status: {
        type: Sequelize.ENUM,
        values: ['checked','unchecked', 'spam'],
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leads');
  }
};