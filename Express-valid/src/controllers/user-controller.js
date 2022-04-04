const { body, validationResult } = require('express-validator');
const express = require("express")
const app = express()
const route=express.Router()
const User = require("../models/user-model")

route.post("/",body("email").isEmail().custom(async(value)=>{
    const user = await User.findOne({email: value})
    if(user){
        throw new TypeError("Email already exits")
    }
    return true;

}),
body("pincode")
.not()
.isEmpty()
.custom((value)=>{
    if(value.length < 6 || value.length > 6){
        throw new Error("Pincode must be of 6 digits")
    }
    return true
}),
body("age")
.not()
.isEmpty()
.custom((value)=>{
    if(value <= 1  || value >= 100){
        throw new  TypeError("Valid age should be given")
    }
    return true;
}),
async(req,res)=>{
    try{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }


        const user = await User.create(req.body)
        return res.status(201).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

module.exports=route