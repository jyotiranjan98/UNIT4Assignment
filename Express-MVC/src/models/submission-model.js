const mongoose = require("mongoose")
const submissionSchema = new mongoose.Schema({
    EvalId:{type:mongoose.Schema.Types.ObjectId,
        ref:"evaluation"},
    studentId:{type:mongoose.Schema.Types.ObjectId,
        ref:"student"},
        batchId:{type:mongoose.Schema.Types.ObjectId,
            ref:"batch"} ,
    Mark:{type:Number, required:true}
},{
    versionKey:false,
    timestamps:true,
})
const Submission = mongoose.model("submission",submissionSchema)
module.exports = Submission;