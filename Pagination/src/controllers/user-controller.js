const express= require("express")
const User = require("../models/user-model")
const transporter = require("../config/mails")
const router = express.Router()

router.get("/",async(req,res)=>{
    try{

        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 10;

        const skip = (page-1)*pagesize

        const totalpage = Math.ceil((await User.find().countDocuments())/pagesize)

        const users = await User.find().skip(skip).limit(pagesize).lean().exec()
        return res.status(200).send(users)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})


router.post("",async(req,res)=>{
    try{
        const user = await User.create(req.body)

         transporter.sendMail({
            from: user.adminemail, // sender address
            to: user.useremail, // list of receivers
            subject: `Welcome to ABC system ${user.firstname} ${user.lastname}`, // Subject line
            text: `Hi ${user.firstname},Please confirm your email address`, // plain text body
             // html body
          });
        
          return res.status(200).send(user)
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})

// router.post("",async(req,res)=>{
//     try{
//         const user = await User.create(req.body)

//          transporter.sendMail({
//             from: user.useremail, // sender address
//             to: user.adminemail, // list of receivers
//             subject: ` ${user.firstname} ${user.lastname}`, // Subject line
//             text: `Please Welcome , ${user.firstname} ${user.lastname}`, // plain text body
//              // html body
//           });
        
//           return res.status(200).send(user)
//     }
//     catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })



module.exports=router