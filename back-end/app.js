const axios = require('axios')
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const {User, Stonk, Tweet} = require('./schemas')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express()

const finnhub = require('finnhub')
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c1l3joa37fko6in4vvcg";
const finnhubClient = new finnhub.DefaultApi();

mongoose.connect('mongodb+srv://stonk_guy:3g3a20Sol4KP1bZd@cluster0.j7v6m.mongodb.net/stonks-only-go-up?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to the stonk database")
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json())
app.use(cors())


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

    var stonkName = req.params.name;
    stonkName = stonkName.toUpperCase(); 
    finnhubClient.quote(stonkName, (error, data, response) => {
        let stonk = data
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


//add user information to mongodb
app.post('/add-user',(req,res)=>{
    const salt = bcrypt.genSaltSync(8)
    var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body.firstName)
    if(req.body.password != req.body.confirmPassword){
        console.log("confirm does not match")
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
        firstname: "Stonk",
        lastname : "Guy2",
        username : "stonk_guy_420",
        email : "stonkguy420@gmail.com",
        password : "PASSWORD"
    })
    newUser.save().then(()=>res.send(`${newUser.username} saved to database`))
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
