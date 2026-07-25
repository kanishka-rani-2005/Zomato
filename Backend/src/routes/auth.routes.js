const express=require("express")
const authContoller=require("../controllers/auth.controllers")

const router=express.Router()

router.post('/user/register',authContoller.createRegisterController)
router.post('/user/login',authContoller.createLoginController)

module.exports=router