const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const User = require('./user');
const LoginInfo = sequelize.define('logininfo', {
  ipaddress: {type:Sequelize.STRING},
  macaddress: {type:Sequelize.STRING},
  location: {type:Sequelize.STRING},
  duration: {type:Sequelize.INTEGER},
  userAgent:{type:Sequelize.STRING},
    userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    references: {
      model: User,
      key: 'id', 
    },allowNull:false,
    validate: {notNull: true}
  }, 
  syncStatus: {type:Sequelize.INTEGER,allowNull:false,validate: {notNull: true},defaultValue:0},
  loginDate: {type:Sequelize.DATE, field: 'login_date',allowNull:false,defaultValue: Sequelize.NOW,validate: {notNull: true}},
     
},);

module.exports = LoginInfo;
