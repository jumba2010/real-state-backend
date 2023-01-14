const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const Transaction=require('./transaction');
const Profile=require('./profile');
const ProfileTransaction = sequelize.define('profiletransaction', {
  transactionId: {
    type: Sequelize.INTEGER,
    field: 'transaction_id',
    references: {
      model: Transaction,
      key: 'id', 
    }
  },
  profileId: {
    type: Sequelize.INTEGER,
    field: 'profile_id',
    references: {
      model: Profile,
      key: 'id', 
    }
  },
  active:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false, validate: {notNull: true}},
  createdBy:{type:Sequelize.INTEGER,  field: 'created_by',allowNull:false,validate: {notNull: true}},
  updatedBy:{type:Sequelize.INTEGER,  field: 'updated_by'},
  activatedBy: {type:Sequelize.INTEGER, field: 'activated_by',allowNull:false,validate: {notNull: true}},
  activationDate: {type:Sequelize.DATE, field: 'activation_date',allowNull:false,defaultValue: Sequelize.NOW,validate: {notNull: true}},
},{defaultScope: {
    where: {
      active: true
    },
   
  },}
);

module.exports = ProfileTransaction;
