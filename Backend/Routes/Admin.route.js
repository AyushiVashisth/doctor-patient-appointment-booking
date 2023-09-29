const express=require("express");

const AdminRouter=express.Router()

const jwt=require("jsonwebtoken")
require("dotenv").config()

AdminRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email=="admin@gmail.com"){
            if(password=="admin"){
                var token = jwt.sign(`${process.env.secretKey}`);
                res.status(200).json({token,status:true,message:"Logged in sucessfully"})
            }else{
                res.status(201).json({status:false,message:"Wrong Credentials!"})
            }
        }else{
            res.status(201).json({status:false,message:"Wrong Credentials!"})

    }
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports=AdminRouter