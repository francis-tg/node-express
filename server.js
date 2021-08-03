const express = require("express")
const exprhbs = require("express-handlebars")
const hbs = require("express-handlebars").create()
const app = express()
const sequelize = require("./models/Database")
const passport = require("passport");
const user = require("./route/user")
const home = require("./route/home")

const flash = require("express-flash")
const PassportLocal = require("./middleware/passport")

const session = require("express-session")

require('dotenv').config()
const port = process.env.PORT || 5000

PassportLocal(passport)

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 1000*60*60*24
   }
}))

sequelize.sync().then(()=>{console.log("> Database ready")})


app.engine("handlebars", exprhbs())
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.use(function(req, res,next){
 res.locals.user = req.user || null
 next();
})

hbs.getPartials().then(function (partials) {
    //console.log(partials);
    // => { 'foo/bar': [Function],
    // =>    title: [Function] }
});
app.get("/", (req, res)=>{
    res.render("home")
})

app.use('/user', user)

app.use('/home',home)


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))