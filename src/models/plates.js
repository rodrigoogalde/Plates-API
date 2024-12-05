'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plates.init({
    site: DataTypes.STRING,
    plate: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    owner: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plates',
  });
  return Plates;
};