const jwt=require("jsonwebtoken")
const {hotel}=require("../Models/hotel.model")

const auth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,"masai")
        const hotel=await hotel.findById(decoded.hotelId)

        if(!hotel){
            throw new Error();
        }
        req.hotel=hotel;
        next();
    }catch(err){
        res.status(400).json({error:"Authorization failed"})
    }
}


module.exports={
    auth
}