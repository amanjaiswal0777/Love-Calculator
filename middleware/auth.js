const jwt = require("jsonwebtoken");
const Form=require("../models/home");
 const auth =async(req,res,next)=>{
    try{
        
        const token = req.cookies.jwt;
        const verifyUser=jwt.verify(token,"mynameisamanjaiswalsonofaniljaiswalal");

        const user=await Form.findOne({_id:verifyUser._id})
        
        req.token=token;
        req.user=user;
        console.log("show them data base",req.user)
        // console.log(verifyUser);
        next();
    }
    catch(err){
        return res.send("jwt not found dear")

    }
 }
 module.exports=auth;