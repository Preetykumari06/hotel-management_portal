const express=require("express")
const jwt=require("jsonwebtoken")
const { hotelModel }=require("../Models/hotel.model")
const hotelRouter=express.Router()

hotelRouter.get("/",async(req,res)=>{
     
})

hotelRouter.post("/add",async(req,res)=>{
    try{
        const hotel=new hotelModel(req.body)
        await hotel.save()
        res.status(200).json({"msg":"Hotel added","addedHotel":req.body})
    }catch(err){
       res.status(400).json({"error":err.message})
    }
})

hotelRouter.get("/:id",async(req,res)=>{
    try{
      const hotel=await hotel.findOne({_id:req.params.id})
      if(!hotel){
        res.status(400).json({"msg":"Hotel not found"})
      }
      res.json(hotel)
    }catch(err){
        res.status(400).json({"error":err.message})
    }
})

hotelRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        await hotelModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({"msg":"Hotel has been updated"})
    }catch(err){
        res.status(400).json({"error":err.message})
    }
})

hotelRouter.delete("/del/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        await hotelModel.findByIdAndDelete({_id:id})
        res.status(200).json({"msg":"Hotel has been deleted"})
    }catch(err){
        res.status(400).json({"error":err.message})
    }
})


module.exports={
  hotelRouter
}