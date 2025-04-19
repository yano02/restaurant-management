// Add the sequelize models

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('customer', {
  
});

const Table = sequelize.define('table', {
  
});

const Product = sequelize.define('product', {
  
});

const Menu = sequelize.define('menu', {
  
});

const Reservation = sequelize.define('reservation', {
  
});

module.exports = {
  sequelize,
  Customer,
  Table,
  Product,
  Menu,
  Reservation
};
