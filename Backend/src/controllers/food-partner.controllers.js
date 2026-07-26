
const foodPartnerModel=require('../models/foodpartner.model')
const foodModel=require('../models/food.model')


async function getFoodItemsById(req,res){

    const partnerid=req.params.id;

    const foodPartner=await foodPartnerModel.findById({_id:partnerid})

    const foodItemsByFoodPartner=await foodModel.find({
        foodPartner:partnerid
    })

    if(!foodPartner){
        return res.status(400).json({
            message:"Partner not exist"
        })
    }

    res.status(200).json({
        message:"Food partner found",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodPartner
        }
    })

}


module.exports={getFoodItemsById}