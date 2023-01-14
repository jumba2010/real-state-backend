const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const SentMessage = sequelize.define('sentmessage', {
  sucursalId: {type:Sequelize.INTEGER,allowNull:false, validate: {notNull: true}},
  requestId: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  senderId: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  studentId: {type:Sequelize.INTEGER,allowNull:false, validate: {notNull: true}},
  status: {type:Sequelize.INTEGER,allowNull:false,defaultValue: 0, validate: {notNull: true}},
  number: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  message: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true}},
  date: {type:Sequelize.DATE,allowNull:false, defaultValue: Sequelize.NOW,validate: {notNull: true}},
 
});

module.exports = SentMessage;
