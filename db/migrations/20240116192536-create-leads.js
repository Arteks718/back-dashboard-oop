'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leads', {
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
          len: [0, 64]
        }
      },
      ip_address: {
        type: Sequelize.STRING,
        validate: {
          isIPv4: true
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true
        }
      },
      sales_manager_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sales_managers",
          key: "id"
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['checked', 'unchecked', 'spam'],
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
    await queryInterface.dropTable('leads');
  }
};