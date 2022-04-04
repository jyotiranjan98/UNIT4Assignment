const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    gender:{type:String,required:false},
    DOB:{type:Date,required:false},
    type:{type:String,enum:["student","instructor"],required:false}
},{
    versionKey: false,
    timestamps: true,
})
const User = mongoose.model("user",userSchema)

module.exports=User;