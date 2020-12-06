const Sequelize = require('sequelize');
const sequelize = require('../Database/database');


const user = sequelize.define('user',{id:{type: Sequelize.INTEGER,autoIncrement: true , primaryKey: true},
    email:{type : Sequelize.STRING, unique:true, allowNull: false} , username: {type: Sequelize.STRING , allowNull: false },
    password :{type : Sequelize.STRING ,allowNull: false},
    followers : {type : Sequelize.INTEGER,default: 0,allowNull: false} , followed:{type : Sequelize.INTEGER,default: 0, allowNull: false}
})

module.exports = user;