const express = require("express")
const app=express()


app.get('/books', allbooks,(req,res)=>{   
   
   return res.send({})
  })


app.get('/book/:name', singlebook,(req,res)=>{ 
     
  return  res.send({ Bookname : req.name})
})

function allbooks(req,res,next){
    console.log("Fetching all Books")
    next();
}


function singlebook(req,res,next){
    if(req.params.name==="harryPotter"){
        req.name="Jack-Janny"
    }
    next();
}


app.listen(4502,()=>{
    console.log("Connecting to the server of PORT 4500")
})