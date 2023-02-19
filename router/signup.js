const express=require('express');
const router=express.Router();

const signupController=require('../controller/signup');

router.post('/signup-data',signupController.postDataForSignup)
module.exports=router;