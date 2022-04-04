const express = require("express")
const app = express()
const connect = require("./configs/dbs")
app.use(express.json())

const userController = require("./controllers/user-controller")
app.use("/users", userController)

app.listen(6000,async()=>{
    try{
        await connect()
        console.log("Connecting to the PORT 6000")
    }
    catch(err){
        console.log(err)
    }

})