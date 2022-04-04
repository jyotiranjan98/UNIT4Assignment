const express= require("express")
const router = express.Router()
const Product = require ("../models/product-model")
const authententicate =require("../middlewares/authentication")
const authorise =require("../middlewares/authorise")
router.post("",authententicate,async(req,res)=>{
try{
    req.body.userId = req.user._id
    const products = await Product.create(req.body)
    return res.status(200).send(products)
}
catch(err){
    return res.status(400).send(err.message)
}
})


router.get("",async(req,res)=>{
    try{
        // req.body.userId = req.user._id
        const products = await Product.find().lean().exec()
        return res.status(200).send(products)
    }
    catch(err){
        return res.status(400).send(err.message)
    }

})


router.patch("/:id",authententicate,authorise(["seller1","seller2"]),async(req,res)=>{
    try{
        // req.body.userId = req.user._id
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
    })

    router.delete("/:id",authententicate,authorise(["seller1","seller2"]),async(req,res)=>{
        try{
            // req.body.userId = req.user._id
            const product = await Product.findByIdAndDelete(req.params.id)
            return res.status(200).send(product)
        }
        catch(err){
            return res.status(400).send(err.message)
        }
        })
module.exports= router