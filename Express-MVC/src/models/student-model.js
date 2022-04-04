const  mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    
    rollnumber :{type:Number,required:true}  ,
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"user"},
    batchId:{type:mongoose.Schema.Types.ObjectId,
        ref:"batch"} 
},{
    versionKey: false,
    timestamps: true,
})

const Student = mongoose.model("student",studentSchema)

module.exports=Student;


// 6233fb231329ebcc61d110ec-batchId
//6233ff54c7d852f83eeef4ec-userId