const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("ok1")
})


app.listen("5000",()=>{
    console.log("Server running on port 6000")
})