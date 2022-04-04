const express = require("express")
const app = express()
const Evaluation = require("../models/evaluation-model")
const route = express.Router();
route.post("",async(req,res)=>{
    try{
        const eval = await Evaluation.create(req.body)
        return res.status(201).send(eval)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})
route.get("",async(req,res)=>{
    try{
        const evaluations = await Evaluation.find()
        .populate({
            path:"studentId",
            select:["rollnumber"],
             populate:{path:"userId",select:["firstname"]},
             
            
        })
        .populate({path:"batchId",select:["batchname"]})
        .lean()
        .exec()
        return res.status(200).send(evaluations)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

route.delete("",async(req,res)=>{
    try{
        const evaluations=await Evaluation.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send({evaluations})
    }
    catch(err){
        return res.status(500).send({message:err.message}) 
    }
})

route.patch("",async(req,res)=>{
    try{
        const evaluation=await Evaluation.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        }).lean().exec() 
        return res.status(200).send(evaluation)
    }
    catch(err){
        return res.status(500).send({message:err.message}) 
    }
})
module.exports=route;