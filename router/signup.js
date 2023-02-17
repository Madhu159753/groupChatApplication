const express=require('express')
const router=express.Router();

const signupController=require('../controller/signup');

router.post('/signup',signupController.postDataForSignup)
module.exports=router;