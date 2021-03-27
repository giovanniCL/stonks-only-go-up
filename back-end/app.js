const express = require("express")
const app = express()

//ROUTES GO HERE
app.get('/', (req,res)=>{
    res.send("STONKS ONLY GO UP")
})
//
module.exports = app
