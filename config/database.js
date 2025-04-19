// The connexion to the database
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todolist', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false // quiet mode
});

module.exports = sequelize;
