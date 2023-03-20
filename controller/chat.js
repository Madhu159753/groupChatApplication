const chat=require('../model/chat');
const User=require('../model/signup');

exports.postchatData=async(req,res,nexts)=>{
    try{
const message=req.body.message;
const name=req.user.name;
const createdAt=req.user.createdAt;
console.log(name);

const data=await chat.create({message,name,createdAt,signupId:req.user.id})
res.status(201).json({data,message:'successfully added message'})
}
catch(err){
    console.log(err)
    res.status(500).json({err:err})
}
}
exports.getChatData=async(req,res,next)=>{
    let msgId=req.query.msg;
    try{
    const data=await chat.findAll()
    //console.log(data.length);
    let index=data.findIndex(chat=>chat.id==msgId)
    //console.log("index",index)
    let messagetosend=data.slice(index+1)
    //console.log("message after slicing",messagetosend);
    let username=await req.user.name;
    //console.log("username",username.split(' ')[0])
     res.status(201).json({messagetosend,username})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err})
    }
}

exports.groupchat=async(req,res,next)=>{
    try{
    const user=await User.findAll({where:{id:req.user.id}}) 
      res.json({user:user})

    }
    catch(err){
       res.json({err:err})
    }

}