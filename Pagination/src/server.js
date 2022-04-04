const app = require("./index")
const connect = require("./config/dbs")

app.listen(4500,async()=>{
    try{
        await connect()
        console.log("Connecting to the Port 4500")
    }
    catch(err){
        console.log(err.message)
    }
})