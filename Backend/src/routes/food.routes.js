const express=require("express")
const foodContoller=require("../controllers/food.controllers")

const router=express.Router()
const authMiddleware=require("../middlewares/auth.middleware")
const multer=require('multer')


const upload=multer({
    storage:multer.memoryStorage(),
})
/**
 * @route /api/food
 * @type Protected
 * @description add food item along with its videos
 */ 
router.post('/',authMiddleware.authFoodPartnerMiddleware,
                upload.single('video'),
                foodContoller.addFoodItem)

router.get('/',authMiddleware.authUserMiddleware,
                foodContoller.getFoodItems)

router.post('/like',authMiddleware.authUserMiddleware,
                foodContoller.likeController)

router.post('/save',authMiddleware.authUserMiddleware,
                foodContoller.saveController)
                
module.exports=router