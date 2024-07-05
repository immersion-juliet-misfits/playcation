const { Sequelize, DataTypes } = require('sequelize');


// connect to mysql database
const db = new Sequelize('healthier', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

