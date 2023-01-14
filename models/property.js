const { Sequelize, Model } = require('sequelize');
const Favorite = require('./favorite');
class Property extends Model {}
Property.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  area: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM,
    values: ['apartment', 'house', 'commercial'],
    defaultValue: 'apartment'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  latitude: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },
  forSale: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  nrOfBedRooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  garage: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  photos: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  views: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  reviews: {
    type: Sequelize.JSON,
    allowNull: true,
  }

});

Property.belongsToMany(User, { through: Favorite, foreignKey: 'propertyId' });
module.exports = Property;
