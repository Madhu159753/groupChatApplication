const Sequelize=require('sequelize');
const dotenv=require('dotenv');
dotenv.config();
 const sequelize=new Sequelize(process.env.MYSQL_SCHEMA,process.env.MYSQL_USER,MYSQL_PASSWORD,{
    dialect:'mysql',
    host:process.env.MYSQL_HOST
 })
 module.exports=sequelize;