const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Todo = sequelize.define('Todo',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey:true,
    allowNull:false
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  completed: Sequelize.BOOLEAN,
});

module.exports = Todo;