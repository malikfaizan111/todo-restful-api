const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('User',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey:true,
    allowNull:false
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;