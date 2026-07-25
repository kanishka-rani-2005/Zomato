const mongoose=require("mongoose")



const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'Please enter your name']
    },
    email:{
        type:String,
        required:[true,'Email is mandatory to fill'],
        unique:true
    },
    password:{
        type:String
    }
},{timestamps:true})


module.exports=mongoose.model('user',userSchema)