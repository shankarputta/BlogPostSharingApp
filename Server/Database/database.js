const Sequelize = require('sequelize')

//This will maintain the database connection and the database connection pool and configure the database
const sequelize  =  new Sequelize('expressy','venkatesh@blogpostsharing','Dhanush@97',{dialect:'mysql',host:'blogpostsharing.mysql.database.azure.com',ssl: true});

module.exports = sequelize;