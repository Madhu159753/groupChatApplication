const chat=require('../model/chat');

exports.postchatData=async(req,res,nexts)=>{
    try{
const message=req.body.message;
const name=req.user.name;
const createdAt=req.user.createdAt;
console.log(name);

const data=await chat.create({message,name,createdAt,signupId:req.user.id})
  res.status(201).json({message:data})
}
catch(err){
    console.log(err)
    res.status(500).json({err:err})
}
};
exports.getChatData=async(req,res,next)=>{
    try{
    const data=await chat.findAll()
     res.status(201).json({allData:data})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:err})
    }
}