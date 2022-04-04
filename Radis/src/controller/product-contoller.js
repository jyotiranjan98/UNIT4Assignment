const express= require("express")
const Product = require("../model/product-model")
const client = require("../configs/redis")
const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        const products = await Product.find().lean().exec()

        client.set("products", JSON.stringify(products))
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})



router.get("",async(req,res)=>{
    try{
        client.get("products", async function(err,fetchProducts){
            if(fetchProducts){
                const products = JSON.parse(fetchProducts)
                return res.status(200).send({products,redis:"Coming from Redis"})
            }
            else{
                try{
                    const products = await Product.find().lean().exec()
                    client.set("products", JSON.stringify(products))
                    return res.status(200).send({products, redis:"Coming from database"})
                }
                catch(err){
                    return res.status(400).send(err.message) 
                }
               
            }
        })
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})



router.get("/:id",async(req,res)=>{
    try{
        client.get(`products.${req.params.id}`, async function(err,fetchProducts){
            if(fetchProducts){
                const products = JSON.parse(fetchProducts)
                return res.status(200).send({products,redis:"Coming from Redis"})
            }
            else{
                try{
                    const products = await Product.findById(req.params.id).lean().exec()
                    client.set(`products.${req.params.id}`, JSON.stringify(products))
                    return res.status(200).send({products, redis:"Coming from database"})
                }
                catch(err){
                    return res.status(400).send(err.message) 
                }
               
            }
        })
        
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})

router.patch("/:id",async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
        const products = await Product.find().lean().exec()
        client.set(`products.${req.params.id}`,JSON.stringify(products))
        client.set("products", JSON.stringify(products))
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})


router.delete("/:id",async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec()
        const products = await Product.find().lean().exec()
        client.del(`products.${req.params.id}`)
        client.set("products", JSON.stringify(products))
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})
module.exports=router