const express=require('express')
const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function createRegisterController(req,res){

    const {fullName,email,password}=req.body


    if(!fullName || !email ){
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
        fullName,
        email,
        password:hashedPassword
    })

    const token =jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    return res.status(201).json({
        message:"User register successfully.",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

async function createLoginController(){

}

module.exports={createRegisterController,createLoginController}