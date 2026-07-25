const app=require("./src/app")
require("dotenv").config()
const connectDb=require("./src/db/db")

PORT=process.env.PORT || 3000

connectDb()

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})