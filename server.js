const express = require("express")
const exprhbs = require("express-handlebars")

const app = express()

app.engine("handlebars", exprhbs())
app.set("view engine", "handlebars")

app.get("/", (req, res)=>{
    res.render("home")
})


app.listen("5000",()=>{
    console.log("Server running on port 6000")
})