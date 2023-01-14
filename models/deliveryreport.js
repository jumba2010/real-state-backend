const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const DeliveryReport = sequelize.define('deliveryreport', {
  requestId: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  senderId: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  status: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  number: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  date: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  
});

module.exports = DeliveryReport;
