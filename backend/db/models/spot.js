'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      Spot.belongsTo(
        models.User,
        {
          foreignKey: 'ownerId'
        }
      );
    }
  }
  Spot.init({
    ownerId: DataTypes. INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    previewImage: DataTypes.STRING,
    avgRating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};