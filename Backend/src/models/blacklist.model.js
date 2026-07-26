const mongoose=require("mongoose")


const tokenBlackListSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,'Token is required to logout'],
        unique:[true,'Token is already blacklisted']
    }
},{timestamps:true})


tokenBlackListSchema.index({createdAt:1},{
    expireAfterSeconds:60*60*24*3
})


module.exports=mongoose.model('tokenblacklist',tokenBlackListSchema)