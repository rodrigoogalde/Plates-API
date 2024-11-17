'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plate.init({
    idcomp: DataTypes.STRING,
    idcam: DataTypes.STRING,
    plt: DataTypes.STRING,
    dtf: DataTypes.DATE,
    cnf: DataTypes.FLOAT,
    idlist: DataTypes.STRING,
    idname: DataTypes.STRING,
    idlan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plate',
  });
  return Plate;
};