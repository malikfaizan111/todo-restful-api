
const Sequelize = require('sequelize');

const sequelize = new Sequelize('rest-api','root','123123',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;