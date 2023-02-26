const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.json())
app.use(cors())

const signupRoute=require('./router/signup');
const sequelize=require('./util/database')
const loginRoute=require('./router/login');
const chatRoute=require('./router/chat');
app.use(signupRoute);
app.use(loginRoute);
app.use("/message",chatRoute);

const signup=require('./model/signup');
const chat=require('./model/chat');
signup.hasMany(chat)
chat.belongsTo(signup)
sequelize
.sync()
.then(result=>{
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})