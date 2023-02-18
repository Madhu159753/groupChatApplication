const bcrypt=require('bcrypt');
const signup=require('../model/signup');
const dotenv=require('dotenv');

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
        return res.status(400).json({err:'bad parameter,something is missing'});
    }
    const user=await signup.findAll({where:{email,phonenumber}})
    if(user){
      return res.status(401).json({msg:'already signup'})
    }
    const saltrounds=10;
    //const error=[];
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
        const data= await signup.create({name,email,phonenumber,password:hash});
        res.status(201).json({data:data,message:'successfully created new user'});
    })
  }
  catch(err){
    console.log(err)
    res.status(500).json({err:err})
  }
};
