const group = require('../model/group');
//const signup = require('../model/signup');
const User=require('../model/signup');
//const Op=require('sequelize');
const usergroup=require('../model/usergroupconnect');
const chat=require('../model/chat');

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
    const result1=await usergroup.create({is_admin:true,groupId:gid,signupId:uid})
    res.json({success:"true"})
}
catch(err){
   console.log(err);
    res.status(500).json({message:"SOME THING WENT WRONG"})
}
}

exports.getGroup=async(req,res,next)=>{
   try{
   const uid=req.user.id;
   //console.log(uid);
      const data=await usergroup.findAll({where:{signupId:uid}})
      //console.log("hel",data)
      let gpids=[];
      for(let i=0;i<data.length;i++){
         let groupdata=await group.findByPk(data[i].groupId)
         gpids.push(groupdata);
      } 
      res.status(200).json({usergps:gpids})
   }
   catch(err){
   // console.log(err);
    res.json({err:err,success:"false"})
   }
}

exports.addusertogroup=async(req,res,next)=>{
   try{
   const uid=req.user.id;
   const newuser=req.body.addingemail;
   const gid=req.body.groupid;
   const makeadmin=req.body.makeadmin;
   const adduser=await User.findAll({where:{email:newuser}})
   var adduserid=adduser[0].id;
    const user=await usergroup.findAll({where:{signupId:uid,groupId:gid}})
    if(user.length >  0 && user[0].is_admin){
      if(makeadmin=="on"){
       const data=await  usergroup.create({is_admin:true,groupId:gid,signupId:adduserid})
       console.log(data);
      }
      else{
         const data1=await usergroup.create({is_admin:false,groupId:gid,signupId:adduserid})
        // console.log(data1)
         res.json({success:"true"});
      }
    }else{
      res.json({success:"false", message:"unAuthorized"});
    }
   }
   catch(err){
      console.log(err)
      res.json({err:err})
   }   
}

exports.removeUserFromGroup=async(req,res,next)=>{
   try{
  const uid=req.user.id;
  const rmuser=req.body.rmemail;
 const gid=req.body.groupid;
  var rmuserid;
  
   const user=await User.findAll({where:{email:rmuser}});
   rmuserid=user[0].id;
   const userdata=await usergroup.findAll({where:{signupId:uid,groupId:gid}})
    if(userdata[0].is_admin){
     const deleteuser=await usergroup.destroy({where:{signupId:rmuserid,groupId:gid}})
    } 
    res.json({message:"success"}) 
}
  catch(err){
   console.log(err);
   res.json({err:err})
  }
  
}
exports.groupChat=async(req,res,next)=>{
   const message=req.body.message;
   const signupId=req.user.id;
   const groupId=req.params.groupId;
   try{
   const data=await chat.create({message,name:req.user.name,signupId,groupId})
        res.json({data,message:'success'})
   }
 catch(err){

 }
}
exports.getGroupMessage=async(req,res,next)=>{
   const groupId=req.params.groupId;
   try{
  const data=await chat.findAll({where:{groupId}})
  console.log("234",data)
       res.json({data:data,message:'success'})
   }
   catch(err){
      console.log(err)
      res.json({err:err})
   }
}