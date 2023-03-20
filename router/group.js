const express=require('express');
const router=express.Router();
const groupController=require('../controller/group');
const chatMiddleware=require('../middlewear/jwtToken');

router.post('/creategroup',chatMiddleware.decryptuUserId,groupController.creatGroup);
router.get('/getgroup',chatMiddleware.decryptuUserId,groupController.getGroup);
router.post('/addusertogroup',chatMiddleware.decryptuUserId,groupController.addusertogroup);
router.post('/removeuser',chatMiddleware.decryptuUserId,groupController.removeUserFromGroup);
router.post('/postData/:groupId',chatMiddleware.decryptuUserId,groupController.groupChat);
router.get('/getGroupMessage/:groupId',chatMiddleware.decryptuUserId,groupController.getGroupMessage)
module.exports=router;