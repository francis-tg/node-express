const express = require("express")

const app = express.Router()

app.route('/login')
   .get((req,res)=>{
       res.render("user/login")
   })
   .post((req, res)=>{
       if(req.body.username !=="" && req.body.password !==""){

       }else{
           res.send("Veuillez renseigner les champs...")
       }
   });

app.route('/register')
    .get((req,res)=>{
    res.render("user/register")
    })
    .post((req, res)=>{
    if(req.body.username !=="" && req.body.password !==""){

       }else{
           res.send("Veuillez renseigner les champs...")
       }
    });

// app.get('/login' , (req , res)=>{
//     res.render("user/login")

// })

// app.post('/login' , (req , res)=>{
//     console.log(req.body)

// })

// app.get('/register' , (req , res)=>{
//     res.render("user/login")

// })

// app.post('/register' , (req , res)=>{
//     res.send(req.body)

// })

module.exports = app