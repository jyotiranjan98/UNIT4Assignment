const express = require("express")
const app = express()
const Student = require("../models/student-model")
const route = express.Router();

route.post("/",async(req,res)=>{
    try{
        const students = await Student.create(req.body)
        return res.status(201).send(students)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

route.get("",async(req,res)=>{
    try{
        const students = await Student.find()
        .populate({
            path:"userId",
            select:["firstname"],
            // populate:{path:"batchId",select:["batchname"]}
        })
        .populate({
          path:"batchId",
          select:["batchname"]  
        })
        .lean()
        .exec()
        return res.status(200).send(students)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
 })


module.exports=route;