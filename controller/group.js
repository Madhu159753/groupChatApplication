const group = require('../model/group');
const User=require('../model/signup');
const Op=require('sequelize');
const usergroup=require('../model/usergroupconnect');


exports.creatGroup=async(req,res,next)=>{
    const {groupname}=req.body;
    try{
    if(!groupname){
       return res.status(400).json({message:'please enter group name '})
    }
    
    const data=await group.create({groupname});
   // res.status(201).json({groupname:data,message:'group created successfull'})
    const result=await group.findAll({where:{groupname:groupname}})
    const gid=result[0].id;
    const uid=req.user.id;
    const result1=await usergroup.create({groupId:gid,signupId:uid})
    res.json({success:"true"})
}
catch(err){
   console.log(err);
    res.status(500).json({message:"SOME THING WENT WRONG"})
}
}

exports.getGroup=async(req,res,next)=>{
   const uid=req.user.id;
   let gpids=[];
   try{
      const data=await usergroup.findAll({where:{signupId:uid}})
      for(i=0;i<data.length;i++){
         gpids.push(data[i].groupId);
      }
     const data1=await group.findAll({where:{id:{[Op.or]:gpids}}})
     res.json({usergps:data1})
        
   }
   catch(err){
    //console.log(err);
    res.json({err:err,success:"false"})
   }
}