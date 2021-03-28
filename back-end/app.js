const express = require("express")
const app = express()

app.use(express.static('public'))

//ROUTES GO HERE
app.get('/', (req,res)=>{
})
//
module.exports = app
