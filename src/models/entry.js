'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entry.init({
    id_computer: DataTypes.STRING,
    id_camera: DataTypes.STRING,
    plate: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    confidence: DataTypes.FLOAT,
    id_list: DataTypes.STRING,
    id_lane: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entry',
  });
  return Entry;
};