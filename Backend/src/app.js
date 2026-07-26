const express =require("express")
const cookieParser=require("cookie-parser")
const authRouter=require('../src/routes/auth.routes')
const foodRouter=require('../src/routes/food.routes')
const foodPartnerRouter=require('../src/routes/food-partner.routes')

const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cookieParser())

const ORIGIN=process.env.CORS_ORIGIN||'http://localhost:5173'

app.use(cors({
    origin:ORIGIN,
    credentials:true
}));

app.use("/api/auth",authRouter)
app.use("/api/food",foodRouter)
app.use("/api/food-partner",foodPartnerRouter)


module.exports=app