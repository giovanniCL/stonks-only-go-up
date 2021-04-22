const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../db')
const cors = require('cors')

router.use(cors())

router.get('/stonks', async (req,res) => {
    let response = await axios("https://my.api.mockaroo.com/stonks.json?key=7d2830f0")
    res.json(response.data)
})

router.get('/:stonk', async (req, res) => {
    let token = req.headers["x-access-token"]
    if(!token) return res.send("No token provided")
    let response = await axios.get('http://localhost:3000/api/auth/me',{
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