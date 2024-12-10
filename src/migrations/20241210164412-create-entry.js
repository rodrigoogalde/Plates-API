'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_computer: {
        type: Sequelize.STRING
      },
      id_camera: {
        type: Sequelize.STRING
      },
      plate: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      },
      confidence: {
        type: Sequelize.FLOAT
      },
      id_list: {
        type: Sequelize.STRING
      },
      id_lane: {
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
    await queryInterface.dropTable('Entries');
  }
};