const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.json())
app.use(cors())

const signupRoute=require('./router/signup');
const sequelize=require('./util/database')
app.use(signupRoute);
sequelize
.sync()
.then(result=>{
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})