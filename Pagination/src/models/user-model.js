const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:false},
    useremail:{type:String,required:true},
    adminemail:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true
})
const User = mongoose.model("user",userSchema)
module.exports=User