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
const {Stonk, Tweet} = require('./schemas')
const User = require('./user/User');

const app = express()

const finnhub = require('finnhub')
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();
const db = require('./db');
const { Test } = require('mocha')

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/users', UserController);
app.use('/api/auth', AuthController);
app.use('/follow',FollowController)

require('./stonk/singleStonkBackend')(app);

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

app.get('/setup/confirm', cors(), async (req,res) => {
    // More of a 'get confirmation data'
    // Should also be a post request to send the final account data to the db (still obviously not configured)
    //console.log("setup/confirm test")
    res.json("hello!")
})

app.get('/single-stonk/:name', (req, res) => {

    //DB Collection
    const stonks = db.collection("stonks");

    var stonkName = req.params.name;
    stonkName = stonkName.toUpperCase();

    const query = {symbol: stonkName}

    var stonkInDatabase;
    const stonkData = {
        "name" : stonkName,
        //Name and Symbol equivlent right now, doesn't seem like we need the real name of the stonk just what finnhub codiers a symbol.
        "symbol" : stonkName,
        "stonkometer" : 0,
        "openPrice": 0,
        "highPrice": 0,
        "lowPrice" : 0,
        "currentPrice" : 0
    }
    

    stonks.findOne(query, function (err, stonk){
        if(stonk != null ){
            stonkInDatabase = true;
            stonkData.symbol = stonk.symbol;
            stonkData.stonkometer = stonk.stonkometer;
            stonkData.openPrice = stonk.openPrice;
            stonkData.highPrice = stonk.highPrice;
            stonkData.lowPrice = stonk.lowPrice;
            stonkData.currentPrice = stonk.currentPrice;
            res.send(stonkData);

        }
        else
            stonkInDatabase = false;
        if(!stonkInDatabase){
            finnhubClient.quote(stonkName, (error, data, response) => {
                let stonk = response.body
                stonkData.name = stonkName
                stonkData.openPrice = stonk.o;
                stonkData.highPrice = stonk.h;
                stonkData.lowPrice = stonk.l;
                stonkData.currentPrice = stonk.c;

                const stonkToDB = new Stonk({
                    name: stonkData.name,
                    symbol: stonkData.symbol,
                    stonkometer: stonkData.stonkometer,
                    openPrice: stonkData.openPrice,
                    highPrice: stonkData.highPrice,
                    lowPrice: stonkData.lowPrice,
                    currentPrice: stonkData.currentPrice
                    })
                stonkToDB.save().then(() => console.log("Stonk Saved to DB"));
                    res.send(stonkData);
                });
            
          
            }
                
    })




})




//add user information to mongodb
app.post('/add-user',(req,res)=>{
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            console.log("email already exists")
            res.send('<script>alert("This email already has already been registered"); window.location.href = "http://localhost:3000/signup"; </script>');
        }else{
            const salt = bcrypt.genSaltSync(8)
    var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body.firstName)
    if(req.body.password != req.body.confirmPassword){
        console.log("confirm does not match")
        res.send('<script>alert("Your confirmation password does not match"); window.location.href = "http://localhost:3000/signup"; </script>');
    }else{
        const newUser = new User({
            firstname: req.body.firstName,
            lastname : req.body.lastName,
            username : req.body.userName,
            email : req.body.email,
            password : hashedPassword
        })
        newUser.save()
            .then((result) => { 
                console.log(result);
                res.redirect("http://localhost:3000/setup/initial")

        })
        .catch((err) => {
            console.log(err);
        })
    }
        }
    })
    
})

//This endpoint is only for testing the stonk schema
app.get('/stonk-schema-test',(req,res)=>{
    const newStonk = new Stonk({
        symbol: "TEST",
        openPrice : 10,
        highPrice : 100,
        lowPrice : 0,
        currentPrice : 50
    })
    newStonk.save().then(()=>res.send(`${newStonk.symbol} saved to database`))
})

//This endpoint is only for testing the user schema
app.get('/user-schema-test',(req,res)=>{

    const newUser = new User({
        first_name: "Stonk",
        last_name : "Guy2",
        user_name : "stonk_guy_420",
        email : "stonkguy420@gmail.com",
        password : "PASSWORD"
    })
    newUser.save().then(()=>res.send(`${newUser.user_name} saved to database`))
})

//This endpoint is only for testing tweet schema
app.get('/tweet-schema-test',(req,res)=>{
    const newTweet = new Tweet({
        id: 'TWEET',
        username : "stonk_guy_420",
        content: "Hello World",
        likes: 10,
        retweets: 5
    })
    newTweet.save().then(()=>res.send(`${newTweet.id} saved to database`))
})

//This endpoint is only for 

app.get('/dashboard', cors(), async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})
app.get('/hype', async (req,res) => {
    
    //let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    
    res.json([
        {
            name: "TEST",
            stonkometer: 100,
            price: 100

        }
    ])

})


//
module.exports = app
