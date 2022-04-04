const express = require("express")
const app = express()
const Batch= require("../models/batch-model")
const route = express.Router();
route.post("",async(req,res)=>{
    try{
        const batchs = await Batch.create(req.body)
        return res.status(201).send(batchs)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

route.get("",async(req,res)=>{
    try{
        const batchs = await Batch.find().lean().exec()
        return res.status(200).send(batchs)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})
module.exports=route;