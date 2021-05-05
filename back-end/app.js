require('dotenv').config()
const axios = require('axios')
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const UserController = require('./user/UserController');
const AuthController = require('./auth/AuthController');
const FollowController = require('./follow/FollowController')
const HypeController = require('./hype/HypeController')
const { Stonk, Tweet } = require('./schemas')
const User = require('./user/User');

const app = express()

const finnhub = require('finnhub')
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();
const db = require('./db');
const { Test } = require('mocha')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/users', UserController);
app.use('/api/auth', AuthController);
app.use('/follow', FollowController)
app.use('/hype', HypeController)

require('./stonk/singleStonkBackend')(app);

//ROUTES GO HERE
app.get('/', (req, res) => {

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

app.get('/setup/confirm', cors(), async (req, res) => {
    // More of a 'get confirmation data'
    // Should also be a post request to send the final account data to the db (still obviously not configured)
    //console.log("setup/confirm test")
    res.json("hello!")
})



app.post('/setup/confirm', (req,res) => {
    db.collections.users.updateOne({user_name: req.body.user_name}, {
        $set: {
            followed: req.body.stonks.map(o => o.ticker),
            age: req.body.age,
            gender: req.body.gender,
            location: req.body.location,
            education_level: req.body.education_level
        }
    }, {})
    req.body.stonks.forEach(stonk => {
        
    
    var stonkName ={
        label: stonk.label,
        ticker: stonk.ticker
    }

    console.log(stonk)



    db.collections.stonks.findOne({symbol: stonkName.ticker}, function(err, stonk){

        

        if(!stonk){

            const stonkData = {
            "name": stonkName.label,
            "symbol": stonkName.ticker,
            "stonkometer": 0,
            "openPrice": 0,
            "highPrice": 0,
            "lowPrice": 0,
            "currentPrice": 0
            }

            async function storeCompanyInfo(symbol){
                console.log(symbol)
                const companyInfo = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_KEY}`
                try{
                    let rawComapnyInfo = await axios.get(companyInfo)
                    console.log(rawComapnyInfo)
                    console.log(rawComapnyInfo.data)

                    db.collections.stonks.insertOne({
                        name: stonkData.name,
                        symbol: stonkData.symbol,
                        openPrice: rawComapnyInfo.data.o,
                        highPrice: rawComapnyInfo.data.h,
                        lowPrice: rawComapnyInfo.data.l,
                        currentPrice: rawComapnyInfo.data.c
                    })
                    }
                     catch (error) {
                         console.log(error)
                     }
            }

            storeCompanyInfo(stonkData.symbol)
        
            
        }

    })

});

    
})

//This endpoint is only for testing the stonk schema
app.get('/stonk-schema-test', (req, res) => {
    const newStonk = new Stonk({
        symbol: "TEST",
        openPrice: 10,
        highPrice: 100,
        lowPrice: 0,
        currentPrice: 50
    })
    newStonk.save().then(() => res.send(`${newStonk.symbol} saved to database`))
})

//This endpoint is only for testing the user schema
app.get('/user-schema-test', (req, res) => {

    const newUser = new User({
        first_name: "Stonk",
        last_name: "Guy2",
        user_name: "stonk_guy_420",
        email: "stonkguy420@gmail.com",
        password: "PASSWORD"
    })
    newUser.save().then(() => res.send(`${newUser.user_name} saved to database`))
})

//This endpoint is only for testing tweet schema
app.get('/tweet-schema-test', (req, res) => {
    const newTweet = new Tweet({
        symbol: 'TSLA',
        mentions: 5,
        favorites: 5,
        likes: 10,
        retweets: 5
    })
    newTweet.save().then(() => res.send(`${newTweet.id} saved to database`))
})

//This endpoint is only for 

app.get('/dashboard', cors(), async (req, res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})

app.get('/clean', (req, res) => {
    db.collections.stonks.deleteMany({
        symbol: "TEST"
    })
    db.collections.users.deleteMany({
        password: "PASSWORD"
    })

    db.collections.tweets.deleteMany({
        id: "TWEET"
    })
    res.send("Database Cleaned")
})


//
module.exports = app
