const express=require("express")
const authContoller=require("../controllers/auth.controllers")

const router=express.Router()

router.post('/user/register',authContoller.createRegisterController)
router.post('/user/login',authContoller.createLoginController)
router.get('/user/logout',authContoller.createLogoutController)

router.post('/food-partner/register',authContoller.createRegisterFoodPartnerController)
router.post('/food-partner/login',authContoller.createFoodPartnerLogin)
router.get('/food-partner/logout',authContoller.createFoodPartnerLogout)

module.exports=router
