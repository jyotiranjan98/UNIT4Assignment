const express= require("express")
const mongoose = require("mongoose")
const connect = require("./configs/db")
const app = express()
app.use(express.json())


const userController=require("./controllers/user-controller")
app.use("/users",userController)
const productController = require("./controllers/product-controller")

app.post("/register",register)
app.post("/login",login)
app.use("/products",productController)

const {register,login,newtoken}=require("./controllers/auth-controller")

const passport = require("./configs/google-oauth")


app.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
         
        failureRedirect: '/auth/google/failure', session:false
}),
    function (req, res){
        const token = newtoken(req.user)
        return res.status(200).send({user:req.user, token})
    }

);
app.listen(5000,async()=>{
    try{
        await connect()
        console.log("Connecting on Port 5000...")
    }
    catch(err){
        console.log(err.message)
    }
})

