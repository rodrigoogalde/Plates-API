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
      idcomp: {
        type: Sequelize.STRING
      },
      idcam: {
        type: Sequelize.STRING
      },
      plt: {
        type: Sequelize.STRING
      },
      dtf: {
        type: Sequelize.DATE
      },
      cnf: {
        type: Sequelize.FLOAT
      },
      idlist: {
        type: Sequelize.STRING
      },
      idname: {
        type: Sequelize.STRING
      },
      idlan: {
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