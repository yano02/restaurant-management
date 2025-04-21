// The connexion to the database
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('restaurantdb', 'postgres', 'samwin25', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false // quiet mode
});

module.exports = sequelize;
