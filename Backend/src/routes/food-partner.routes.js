const express=require("express")
const foodContoller=require("../controllers/food-partner.controllers")
const router=express.Router()
const authMiddleware=require("../middlewares/auth.middleware")



router.get('/:id',authMiddleware.authUserMiddleware,
foodContoller.getFoodItemsById)


module.exports=router