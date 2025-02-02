const express=require('express');
const { protectRoute } = require('../middlewares/auth.middleware');
const {getUserforSidebar,getMessages,sendMessages}=require('../controllers/message.controller');
const router=express.Router();
router.get('/user',protectRoute,getUserforSidebar);
router.get('/:id',protectRoute,getMessages);
router.get('/send/:id',protectRoute,sendMessages);

module.exports=router;