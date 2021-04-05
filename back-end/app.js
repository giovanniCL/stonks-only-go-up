const requests = require('requests')
const axios = require('axios')
const express = require("express")
const cors = require('cors')
const app = express()
const finnhub = require('finnhub')
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
const finnhubClient = new finnhub.DefaultApi();


api_key.apiKey = "c1l3joa37fko6in4vvcg";


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

app.get('/signup', (req, res) => {
    //Nothing here yet, not even sure if we will need it.
})

app.get('/single-stonk/:name', (req, res) => {

    var stonkName = req.params.name;
    stonkName = stonkName.toUpperCase;
    
    var stonkURL = "https//finnhub.io/api/v1/quote?symbol=" + stonkName + "&token=";
    
    stonk = requests.get(stonkURL);


    const stonkData = {

        "stonkName" : stonkName, 
        "openPrice" : stonk.o,
        "highPrice" : stonk.h,
        "lowPrice" : stonk.l,
        "currentPrice" : stonk.c
    }

    res.send(stonkData);
})

app.get('/dashboard', cors(), async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})

app.get('/hype', cors(), async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})
//
module.exports = app
