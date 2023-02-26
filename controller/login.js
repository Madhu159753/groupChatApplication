const signup=require('../model/signup')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
function encryeptUserID(id,name){
    return jwt.sign({signupId:id,name:name},process.env.JAVASCRIPT_ACCESSKEY_TOKEN);
}

exports.loginData=async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    try{
 if(!email||!password )
 {
     return res.status(400).json({err:'bad parameer, something is missing'})
 }
 const data=await signup.findAll({where:{email}})
 if(data.length>0){
     bcrypt.compare(password,data[0].password,(err,result)=>{ 
         if(err){
             throw new Error('something went wrong')
         }
         if(result===true){
         res.status(200).json({success:true,message:"user loged in successfuly",token:encryeptUserID(data[0].id),name:data[0].name})
         }
     else{
      return res.status(400).json({success:false,message:"password is incorrect"})
     }
 })
 }
 else{
     return res.status(404).json({success:false,message:"user doesn't exist"})
 }
}
catch(err)
{
    console.log(err);
 res.status(500).json({message:err,success:false})
}
};