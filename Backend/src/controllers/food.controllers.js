const foodModel=require('../models/food.model')
const storageService = require('../services/storage.service');
const { v4: uuid } = require("uuid")
const likeModel=require("../models/likes.model")
const saveModel=require("../models/save.model")

async function addFoodItem(req,res) {
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })


}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

async function likeController(req,res){
    const {foodId}=req.body;
    const user=req.user
    if (!user) {
        return res.status(401).json({
            message: "User not authenticated"
        });
    }

    const isAlreadyLike = await likeModel.findOne({
        user:user._id,
        food:foodId
    })


    if(isAlreadyLike){
        await likeModel.deleteOne({
            user:user._id,
            food:foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likesCount:-1}//decrease count
        })
        return res.status(201).json({
            message:"Food unliked successfully"
        })

    }
    const like=await likeModel.create({
        user:user._id,
        food:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likesCount:1}//increase count
    })

    return res.status(201).json({
        message:"Food liked succesfully",
        like
    })

}


async function saveController(req,res) {
    const {foodId}=req.body;
    const user=req.user

    if (!user) {
        return res.status(401).json({
            message: "User not authenticated"
        });
    }    
    const isAlreadySaved=await saveModel.findOne({
        user:user._id,
        food:foodId
    })
    if(isAlreadySaved){
        await saveModel.deleteOne({
            user:user._id,
            food:foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{savesCount:-1}//decrease count
        })
        return res.status(200).json({
            message:"Food unsaved successfully",
            save: false
        })
    }
    const save = await saveModel.create({
        user:user._id,
        food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId,{
            $inc:{savesCount:1}//increase count
    })
    return res.status(201).json({
        message:"Food saved successfully.",
        save: true
    })
}

async function getsaveController(req,res){

    const user=req.user
    if (!user) {
        return res.status(401).json({
            message: "User not authenticated"
        })
    }

    const savedFoods = await saveModel.find({
        user: user._id
    }).populate({
        path: 'food',
        populate: { path: 'foodPartner', select: 'name' }
    })

    return res.status(200).json({
        message:'Saved foods fetched successfully',
        savedFoods
    })

}

module.exports={
    addFoodItem,
    getFoodItems,
    likeController,
    saveController,
    getsaveController
}