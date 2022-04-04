const express =  require("express")
const app = express()
const connect = require("./configs/db")

const productController = require("./controller/product-contoller")
app.use(express.json())

app.use("/products",productController)

app.listen(4000,async(req,res)=>{
    try{
        await connect()
        console.log("Connect on port 4000")
    }
    catch(err){
        console.log(err)
    }
})