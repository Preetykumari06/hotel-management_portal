const express=require("express")
const connection=require('./db')
const { ownerRouter } = require("./Routes/owner.routes")
const { hotelRouter } = require("./Routes/hotel.routes")
const {auth}=require("./Middleware/auth.middleware")
const { limiter } = require("./Middleware/rateLimiter.middleware")
require('dotenv').config()

const app=express()
app.use(express.json())

app.use("/owners",ownerRouter)
app.use("/hotels",hotelRouter)

app.use("/hotels",auth)
app.use(limiter)

app.get("/", (req,res)=>{
    res.status(200).json({"msg":Welcome})
})



app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log(err)
        console.log("Not connected")
    }
    console.log(`Server is running on port ${process.env.port}`)
})