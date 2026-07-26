const mongoose=require("mongoose")



const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please enter your name']
    },
    lastName:{
        type:String,
        required:true
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