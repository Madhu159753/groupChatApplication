const sequelize=require('../util/database');
const Sequelize=require('sequelize');

const group=sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false
    },
})
module.exports=group;