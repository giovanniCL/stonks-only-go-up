const axios = require('axios')
const express = require("express")
const cors = require('cors')
const app = express()

app.use(express.static('public'))

//ROUTES GO HERE
app.get('/', (req,res)=>{
})
app.get('/login', (req, res) => {
    //Nothing here yet
    //waiting for account database
})

app.get('/reset', (req, res) => {
    //Nothing here yet
    //waiting for account database
})
app.get('/hype', cors(), async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})
//
module.exports = app
