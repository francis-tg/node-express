const express = require("express")
const exprhbs = require("express-handlebars")
const hbs = require("express-handlebars").create()
const app = express()
const sequelize = require("./models/Database")

sequelize.sync().then(()=>{console.log("Database ready")})


app.engine("handlebars", exprhbs())
app.set("view engine", "handlebars")
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


hbs.getPartials().then(function (partials) {
    console.log(partials);
    // => { 'foo/bar': [Function],
    // =>    title: [Function] }
});
app.get("/", (req, res)=>{
    res.render("home")
})
const user = require("./route/user")
app.use('/user', user)


app.listen("5000",()=>{
    console.log("Server running on port 5000")
})