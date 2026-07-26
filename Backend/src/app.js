const express =require("express")
const cookieParser=require("cookie-parser")
const authRouter=require('../src/routes/auth.routes')
const foodRouter=require('../src/routes/food.routes')

const app=express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/food",foodRouter)


module.exports=app