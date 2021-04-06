const request = require('request')
const axios = require('axios')
const express = require("express")
const cors = require('cors')
const app = express()

const finnhub = require('finnhub')
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c1l3joa37fko6in4vvcg";
const finnhubClient = new finnhub.DefaultApi();



app.use(express.static('public'))
app.use(cors())

//ROUTES GO HERE
app.get('/', (req,res)=>{
})

app.get('/signup', (req, res) => {
    //Nothing here yet, not even sure if we will need it.
})

app.get('/single-stonk/:name', (req, res) => {

    var stonkName = req.params.name;
    stonkName = stonkName.toUpperCase(); 
    let stonk
    finnhubClient.quote(stonkName, (error, data, response) => {
        stonk = data
        const stonkData = {

            "stonkName" : stonkName, 
            "openPrice" : stonk.o,
            "highPrice" : stonk.h,
            "lowPrice" : stonk.l,
            "currentPrice" : stonk.c
        }
        res.send(stonkData);
    });
    


})

app.get('/dashboard', cors(), async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})
app.get('/hype', async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})

app.get('/followed/:user', async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    response.data[0].user = req.params.user//attaching user to first object for testing purposes for now
    res.json(response.data)
})
//
module.exports = app
