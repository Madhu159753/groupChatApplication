 const express=require('express');
 const router=express.Router();
const chatController=require('../controller/chat');
const chatMiddleware=require('../middlewear/jwtToken')

router.post('/chat',chatMiddleware.decryptuUserId,chatController.postchatData)
router.get('/getchat',chatMiddleware.decryptuUserId,chatController.getChatData)

module.exports=router;