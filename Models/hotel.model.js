const mongoose=require("mongoose")

const hotelSchema=mongoose.Schema({
    hotel_name: String,
    location: String,
    rating: Number,
    serve_food: Boolean,
})

const hotelModel=mongoose.model("hotel",hotelSchema)


module.exports={
    hotelModel
}