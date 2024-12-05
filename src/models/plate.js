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
    site: DataTypes.STRING,
    plate: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    owner: DataTypes.STRING,
    color: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Plate',
  });
  return Plate;
};