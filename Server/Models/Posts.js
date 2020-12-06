const Sequelize = require('sequelize');
const sequelize = require('../Database/database')

const post = sequelize.define('post',{
    id :{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    Title: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    Description : {
        type : Sequelize.TEXT,
        allowNull : true
    },
    Likes :{
        type : Sequelize.INTEGER,
        allowNull : false,
        default : 0
    } ,
    disLikes : {
        type : Sequelize.INTEGER,
        allowNull : false ,
        default : 0
    }

})

module.exports = post;
