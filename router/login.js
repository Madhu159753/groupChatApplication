const express=require('express');

const router=express.Router();

const logincontroller=require('../controller/login');
const jwtMiddeleware=require('../middlewear/jwtToken');

router.post('/login',logincontroller.loginData);
module.exports=router;