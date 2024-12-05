'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      site: {
        type: Sequelize.STRING
      },
      plate: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plates');
  }
};