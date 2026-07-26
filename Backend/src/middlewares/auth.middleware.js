const foodPartnerModel=require('../models/foodpartner.model')
const jwt=require("jsonwebtoken")
const tokenBlackListModel=require('../models/blacklist.model')
const userModel=require("../models/user.model")

async function authFoodPartnerMiddleware(req,res,next){
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(400).json({
            message:"Unauthorized Access , Login to proceed."
        })
    }
    const isblacklisted=await tokenBlackListModel.findOne({token})
    if(isblacklisted){
        return res.status(401).json({
            message:"Unauthorized , Token is invalid"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        req.foodPartner=foodPartner
        return next()
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Unauthorized Access , Token is invalid!!!"
        })
    }
}

async function authUserMiddleware(req,res,next){
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(400).json({
            message:"Unauthorized Access , Login to proceed."
        })
    }
    const isblacklisted=await tokenBlackListModel.findOne({token})
    if(isblacklisted){
        return res.status(401).json({
            message:"Unauthorized , Token is invalid"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        req.user=user
        return next()
    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Unauthorized Access , Token is invalid!!!"
        })
    }
}

module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware
}