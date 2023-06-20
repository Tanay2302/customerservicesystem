const express=require('express')


const router=express.Router()
const {registeruser,loginuser,getMe}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')
router.post('/',registeruser)
router.post('/login',loginuser)
router.get('/me',protect,getMe)
module.exports=router