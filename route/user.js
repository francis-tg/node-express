const express = require("express")
const ValidateEmail = require("../middleware/Validation")
const Users = require("../models/Users")
const SendMail = require("../middleware/nodemail");
const passport = require("passport");

const bcrypt = require("bcrypt")


app = express.Router()


function isLoggedIn(req, res,next){
    if(req.isAuthenticated()) return next()
    res.redirect('/user/login')
}

function isLoggedOut(req, res,next){
    if(!req.isAuthenticated()) return next()
    res.redirect('/home/')
}

//app.route('/login')
app.get('/login',isLoggedOut,(req,res)=>{
    res.render("user/login")
})
app.post('/login',
       /*passport.authenticate('local'),
  function(req, res) {
    res.redirect('/');
  }*/passport.authenticate('local', { successRedirect: '/home/',
    failureRedirect: '/user/login?error=true',
    failureFlash: true }));

app.route('/register')
    .get((req,res)=>{
    res.render("user/register")
    })
    .post(async(req, res)=>{
    if(req.body.username !=="" && req.body.password !==""){
        if (req.body.email && !ValidateEmail(req.body.email)) {
            res.send("Votre email n'est pas valide...")
        }
        UserInfo = {
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            verification:Math.floor(Math.random() * 1000000),
            isVerify: false
        }
        getUser =Users.findOne({where:{email:UserInfo.email}});
        if (getUser.email === UserInfo.email) {
           res.send("Ce compte existe déjà...")
        }
        await Users.create(UserInfo).then(()=>{
            SendMail(UserInfo.email,"Vérification de compte", "Salut <b>"+UserInfo.username+"</b>, veuillez valider votre compte en faisant click sur le lien en dessous ou sur le boutton <br>"
            + req.get('host')+"/user/"+UserInfo.verification+"/verification <br> <a href='"+req.get('host')+"/user/"+UserInfo.verification+"/verification' class='btn btn-success'>Vérifier</a>")
            
        }).then(res.send("success"))
        .catch(res.send("Une erreur est survenue..."))
    
        
        console.log(UserInfo)
       }else{
           res.send("Veuillez renseigner les champs...")
       }
    });

app.get('/:username/dashboard' , (req , res)=>{

   res.send('hello from simple server :)')

})

app.get('/:code/verification' , async(req , res)=>{

   const code = req.params.code
   await Users.findOne({where:{verification:code}}).then((result)=>{
    const usermail = result.email
    if(result.verification === code){
        console.log(usermail)
        Users.update({isVerify:true}, {where:{email:usermail}}).then(res.redirect("/home/"+result.username+"/"))
        .catch(console.log("error to update"))
    }else{
        res.send("false")
    }
    
    })
   

})

app.get('/logout' , (req , res)=>{

   req.logout()
   res.render('/user/login')

})

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