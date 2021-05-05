const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../db')
const cors = require('cors');
const { Stonk } = require('../schemas');

router.use(cors())

router.get('/stonks', async (req,res) => {

    let token = req.headers["x-access-token"]
    if(!token) return res.send("No token provided")
    let response = await axios.get('http://localhost:8080/api/auth/me',{
        headers: {
            "x-access-token": token
        }
    })
    let user = response.data
    if(user.auth == false) return res.send("Failed to authenticate")

    let user_data = db.collections.users.findOne({user_name: req.headers.user_name})
    var followed;
    await user_data.then(function(result){
        followed = result.followed
    })
    console.log(followed)
    Stonk.find({
        symbol:{
            $in: followed
        }
    },(err, stonks) =>{
        if(err) res.send("error")
        res.json(stonks)

    })


})

router.get('/:stonk', async (req, res) => {
    let token = req.headers["x-access-token"]
    if(!token) return res.send("No token provided")
    let response = await axios.get('http://localhost:8080/api/auth/me',{
        headers: {
            "x-access-token": token
        }
    })
    let user = response.data
    if(user.auth == false) return res.send("Failed to authenticate")

    let followed = user.followed ? user.followed : []
    if(!followed.includes(req.params.stonk)) followed.push(req.params.stonk)
    else followed = followed.filter(value => value != req.params.stonk)

    db.collections.users.updateOne(
        {user_name : user.user_name},
        {
            $set:{followed : followed}
        }
    )

    res.send(`${user.user_name} followed/unfollowed ${req.params.stonk}`)


})

module.exports = router