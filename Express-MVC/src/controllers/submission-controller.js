



const express = require("express")
const app = express()
const Submission = require("../models/submission-model")
const route = express.Router();

route.post("",async(req,res)=>{
    try{
        const submissions = await Submission.create(req.body)
        return res.status(201).send(submissions)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

route.get("",async(req,res)=>{
    try{
       const submission = await Submission.find({"Mark":{$gt:300}})
       .populate({
           path:"EvalId",
           select:["date_Of_eval"],
           populate:{path:"studentId",select:["rollnumber"],
           populate:{path:"userId",select:["firstname"]}
            },
           
       })
    //    .populate({
    //        path:"batchId",
    //        select:["batchname"]
    //    })
       .lean()
       .exec()
       return res.status(200).send(submission)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

module.exports=route


