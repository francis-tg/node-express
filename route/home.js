const express = require("express")
const ValidateEmail = require("../middleware/Validation")
const Users = require("../models/Users")
const passport = require("passport");

function isLoggedIn(req, res,next){
    if(req.isAuthenticated()) return next()
    res.redirect('/user/login')
}

app = express.Router()

app.get('/' , async(req , res)=>{
    const userId = req.session.passport.user
    Users.findOne({where:{id:userId}}).then((result)=>{
            res.send("hello"+result.username)
        
    })
    
    
})


module.exports = app