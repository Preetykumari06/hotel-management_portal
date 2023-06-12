const mongoose=require("mongoose")

const ownerSchema=mongoose.Schema({
    owner_name: String,
    email: {type:String,unique:true},
    password: String,
    phone: String,
    age: Number,
    city: String,
})
const ownerModel=mongoose.model("owner",ownerSchema)


const blacklistTokenSchema=new mongoose.Schema({
    token:String,
})

const BlacklistToken=mongoose.model("BlacklistToken",blacklistTokenSchema)


module.exports={
    ownerModel,
    BlacklistToken
}