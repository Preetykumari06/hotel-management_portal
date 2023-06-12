const express=require("express")
const ownerRouter=express.Router()
const { ownerModel }=require("../Models/owner.model")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

ownerRouter.post("/signup",async(req,res)=>{
    const {owner_name,email,password,phone,age,city}=req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=>{
           if(err){
            res.status(400).json({"msg":"Something went wrong","error":err.message})
           } else {
              const owner=new ownerModel({owner_name,email,password:hash,phone,age,city})
              await owner.save()
              res.status(200).json({"msg":"New owner registered"})
           }
        });
    }catch(err){
        res.status(400).json({"msg":"Something went wrong","error":err.message})
    }
})

ownerRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const owner=await ownerModel.find({email})
        if(owner.length>0){
            bcrypt.compare(password, owner[0].password, (err, result)=>{
                if(result){
                    let token = jwt.sign({ownerID:owner[0]._id},"masai",{expiresIn:"7d"})
                    res.status(200).json({"msg":"Logged in","token":token})
                } else {
                    res.status(400).json({"msg":"Wrong credential"})
                }
            });
        } else {
            res.status(400).json({"msg":"Wrong credential"})
        }
    }catch(err){
        res.status(400).json({"msg":"Something went wrong","error":err.message})
    }
})

module.exports={
    ownerRouter
}