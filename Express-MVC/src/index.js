const express = require("express")
const app = express()
const connect = require("./config/db")
app.use(express.json())

 
// const Student = require("./models/student-model")
// const Batch = require("./models/batch-model")
// const Evaluation = require("./models/evaluation-model")
// const Submission= require("./models/submission-model")

const userController = require("./controllers/user-controller")
const studentController = require("./controllers/student-controller")
const batchController = require("./controllers/batch-controller")
const evaluationController = require("./controllers/eval-controller")
const submissionController = require("./controllers/submission-controller")
app.use("/users",userController)
app.use("/students",studentController)
app.use("/batchs",batchController)
 app.use("/evaluations",evaluationController)
app.use("/evaluations/:id",evaluationController)
app.use("/submissions",submissionController)

app.listen("4000",async ()=>{
    try{
   
       await connect()
       console.log("Connecting to the server 4000...")
    }
    catch(err){
      console.log("Error")
    }
    
})



