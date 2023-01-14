
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
  dialect: process.env.DB_DIALET,
  logging: false
  });
  sequelize.authenticate().then(() => {
  console.log('Connected to the Database')});
  sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database Sync`)
  })


  module.exports = sequelize;