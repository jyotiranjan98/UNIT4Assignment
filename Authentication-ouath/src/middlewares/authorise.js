// const User = require("../models/user-model")

const authorise = (permitRoles)=>{
    return (req,res,next)=>{
        console.log(req.user)
        const user = req.user
        let ispermit= false


        permitRoles.map(role=>{
            console.log(user.role)
            if(user.role==role){
                ispermit=true
            }
            // else{
            //    return res.status(500).send({message:" one Seller can't change other seller products"}) 
            // }
        })

        if(ispermit){
        return next()
        }
        else{
            return res.status(401).send({message:"No one go through to change anythng"})
        }

    }
}

module.exports=authorise