// The connexion to the database
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'yano', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false // quiet mode
});

module.exports = sequelize;
