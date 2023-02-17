const Sequelize=require('sequelize');
const  sequelize=require('../util/database');
const signup=sequelize.define('signup',{
   id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    unique:true,
    allowNull:false,
    primaryKey:true
   } ,
   name:
   {
    type:Sequelize.STRING,
    allowNull:false
   },
   email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
   },
   phonenumber:
   {
    type:Sequelize.INTEGER,
    allowNull:false,
    unique:true
   },
   password:{
    type:Sequelize.INTEGER,
    allowNull:false
   }
});
module.exports=signup;