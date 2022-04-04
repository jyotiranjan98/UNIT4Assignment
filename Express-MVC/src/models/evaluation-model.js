const mongoose = require("mongoose")

const evaluationSchema = new mongoose.Schema({
    date_Of_eval:{type:Date,required:true},
    studentId:{type:mongoose.Schema.Types.ObjectId,
        ref:"student"},
     batchId:{type:mongoose.Schema.Types.ObjectId,
         ref:"batch"} 
},{
    versionKey: false,
    timestamps: true,
})

const Evaluation = mongoose.model("evaluation",evaluationSchema)

module.exports=Evaluation;