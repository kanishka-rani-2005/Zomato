const express=require('express')
const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const tokenBlacklistModel=require('../models/blacklist.model')
const foodpartnerModel=require('../models/foodpartner.model')


async function createRegisterController(req,res){

    const {firstName,lastName,email,password}=req.body


    if(!firstName || !email ||!lastName){
        return res.status(400).json({
            message:"Please enter required information"
        })
    }

    const isExist=await userModel.findOne({email})

    if(isExist){
        return res.status(400).json({
            message:"User already exist with this email. Try any other account to register."
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)


    const user=await userModel.create({
        firstName,
        lastName,
        email,
        password:hashedPassword
    })

    const token =jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    return res.status(201).json({
        message:"User register successfully.",
        user:{
            _id:user._id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName
        }
    })
}

async function createLoginController(req,res){

    const{email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Please provide correct email and password"
        })
    }

    const user=await userModel.findOne({email});

    if(!user){
         return res.status(422).json({
            message:"Retry!!! User does not exist with this email and pasdword",
            status:"failed"
        })
    }

    const isCorrectPassword=await bcrypt.compare(password,user.password);

    if(!isCorrectPassword){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token =jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None"
});

    return res.status(201).json({
        message:"User login successfully.",
        user:{
            _id:user._id,
            email:user.email,
        }
    })
}

async function createLogoutController(req,res){
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(200).json({
            message:"Token required to log out"
        })
    }

    res.clearCookie('token')

    await tokenBlacklistModel.create({
        token:token
    })
    res.status(200).json({
        message:"Use log out successfully"
    })
}

async function createRegisterFoodPartnerController(req,res){
    const {name,email,password,phone,address,contactName}=req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message:"Please enter required information"
        })
    }

    const isExist=await foodpartnerModel.findOne({email})

    if(isExist){
        return res.status(400).json({
            message:"FoodPartner already exist with this email. Try any other account to register."
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)


    const user=await foodpartnerModel.create({
        name,
        email,
        password:hashedPassword,
        address,
        phone,
        contactName
    })

    const token =jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    return res.status(201).json({
        message:"FoodPartner register successfully.",
        foodpartner:{
            _id:user._id,
            email:user.email,
            name:user.name,
            address:address,
            phone:phone,
            contactName:contactName
        }
    })
}

async function createFoodPartnerLogin(req,res){
     const{email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Please provide correct email and password"
        })
    }

    const user=await foodpartnerModel.findOne({email});

    if(!user){
         return res.status(422).json({
            message:"Retry!!! FoodPartner does not exist with this email and pasdword",
            status:"failed"
        })
    }

    const isCorrectPassword=await bcrypt.compare(password,user.password);

    if(!isCorrectPassword){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token =jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    return res.status(201).json({
        message:"Food Partner login successfully.",
        foodpartner:{
            _id:user._id,
            email:user.email,
        }
    })
}

async function createFoodPartnerLogout(req,res){
    const token=req.cookies.token||req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(200).json({
            message:"Token required to log out"
        })
    }

    res.clearCookie('token')

    await tokenBlacklistModel.create({
        token:token
    })
    res.status(200).json({
        message:"Food Partner log out successfully"
    })
}
module.exports={createRegisterController,createLoginController,createLogoutController,
    createFoodPartnerLogin,createRegisterFoodPartnerController,createFoodPartnerLogout
}