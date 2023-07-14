const Sequelize = require('sequelize');
const sequelize = new Sequelize('rest-api', 'root', '123123', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.Todo = require('../Models/todo.model')(sequelize, Sequelize);
models.User = require('../Models/user.model')(sequelize, Sequelize);

module.exports = models;