const express = require("express")
const exprhbs = require("express-handlebars")
const hbs = require("express-handlebars").create()

const app = express()

app.engine("handlebars", exprhbs())
app.set("view engine", "handlebars")
app.use(express.static("public"))
hbs.getPartials().then(function (partials) {
    console.log(partials);
    // => { 'foo/bar': [Function],
    // =>    title: [Function] }
});
app.get("/", (req, res)=>{
    res.render("home")
})


app.listen("5000",()=>{
    console.log("Server running on port 5000")
})