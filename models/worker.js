const Sequelize = require('sequelize');
const sequelize = require('../config/dbconfig');
const User=require('./user');
const Sucursal=require('./sucursal');
const Worker = sequelize.define('worker', {
  name: {type:Sequelize.STRING, allowNull:false,validate: {notNull: true,notEmpty: true}},
  picture:Sequelize.STRING,
  isuser:Sequelize.BOOLEAN,
  address:Sequelize.STRING,
  category:Sequelize.STRING,
  birthdate: {type:Sequelize.DATEONLY, allowNull:false,validate: {notNull: true,isBefore: Sequelize.NOW}},
  contact: {type:Sequelize.STRING,allowNull:false, validate: {notNull: true,notEmpty: true}},
  email: {type:Sequelize.STRING, validate: {isEmail:true}},
  userid: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    references: {
      model: User,
      key: 'id', 
    }
  },
  sucursalId: {
    type: Sequelize.INTEGER,
    field: 'sucursal_id',
    references: {
      model: Sucursal,
      key: 'id', 
    },allowNull:false,
    validate: {notNull: true}
  },
  active:{type:Sequelize.BOOLEAN,defaultValue:true,allowNull:false, validate: {notNull: true}},
  createdBy:{type:Sequelize.INTEGER,  field: 'created_by',allowNull:false,validate: {notNull: true}},
  updatedBy:{type:Sequelize.INTEGER,  field: 'updated_by'},
  activatedBy: {type:Sequelize.INTEGER, field: 'activated_by',allowNull:false,validate: {notNull: true}},
  activationDate: {type:Sequelize.DATE, field: 'activation_date',allowNull:false,defaultValue: Sequelize.NOW,validate: {notNull: true}},
  
},{
  defaultScope: {
    where: {
      active: true
    },
    include: [
      { model: User, where: { active: true }}
    ]
  },
});

module.exports = Worker;
