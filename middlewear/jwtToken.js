const signup=require('../model/signup');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')

dotenv.config();

exports.decryptuUserId=async(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        console.log(token);
        const user=jwt.verify(token,process.env.JAVASCRIPT_ACCESSKEY_TOKEN);
        console.log('userId------>',user.signupId);
          signup.findByPk(user.signupId).then(user =>{
           console.log(JSON.stringify(user));
           req.user=user;
           next();
          }).catch(err =>{throw new Error(err)})
           
        
       }
       catch(err){
           console.log(err);
           res.status(401).json({success:false})
   
       }
   }
