const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.json())
app.use(cors())

const signupRoute=require('./router/signup');
const sequelize=require('./util/database')
const loginRoute=require('./router/login');
const chatRoute=require('./router/chat');
const groupRoute=require('./router/group');
app.use(signupRoute);
app.use(loginRoute);
app.use("/message",chatRoute);
app.use(groupRoute);

const user=require('./model/signup');
const chat=require('./model/chat');
const group=require('./model/group')
const usergroupconnect=require('./model/usergroupconnect');

user.hasMany(chat)
chat.belongsTo(user)

group.hasMany(chat)
chat.belongsTo(group);

user.belongsToMany(group,{through:usergroupconnect})
group.belongsToMany(user,{through:usergroupconnect})



sequelize
.sync()
.then(result=>{
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})