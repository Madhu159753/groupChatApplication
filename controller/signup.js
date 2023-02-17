const bcrypt=require('bcrypt');
const signup=require('../model/signup');
const dotenv=require('dotenv');
const { json } = require('body-parser');
dotenv.config();

function isstringinvalid(string){
    if(string==undefined || string.length===0){
      return true;
    }else{
        return false;
    }
}

exports.postDataForSignup=async(req,res,next)=>{
    const {name,email,phonenumber,password}=req.body;
    try{
    if(isstringinvalid(name)||isstringinvalid(email)||isstringinvalid(phonenumber)||isstringinvalid(password)){
        return res.status(400),json({message:'bad parameter,something is missing'});
    }
    const saltround=10;
    bcrypt.hash(password,saltround,async(err,hash)=>{
        const data=await signup.create({name,email,password:hash,phonenumber});
        res.status(201).json({data:data,message:'successfully created new user'});
    })
  }
  catch(err){
    res.status(500).json({err:err})
  }
}
