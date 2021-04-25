var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");


router.use(express.json());
router.use(express.urlencoded({extended: true}));

var VerifyToken = require('../auth/VerifyToken');
var User = require('./User');

//creating new user
router.post('/register', function(req,res){
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    },
    function(err,user){
        if(err) return res.status(500).send("There was a problem adding the information to the database.")
        res.status(200).send(user)
    })
})

//returning all users in database
router.get('/',function(req,res){
    User.find({},function(err,users){
        if(err) return res.status(500).send("There was a problem finding the users.")
        res.status(200).send(users)
    })
})

//gets single user from database
router.get('/:id',function (req,res){
    User.findById(req.params.id, function(err, user){
        if(err) return res.status(500).send("There was a problem finding the user.")
        if(!user) return res.status(404).send("No user found.")
        res.status(200).send(user);
    })
})
//deletes a user from database
router.delete('/:id', function (req,res){
    User.findByIdAndRemove(req.params.id, function (err, user){
        if(err) return res.status(500).send("There was a problem deleting the user.")
        res.status(200).send(`User ${user.name} was deleted.`)
    })
})

//updates a single user in database
router.put('/:id', VerifyToken, function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
        if(err) return res.status(500).send("There was a problem updating the user.")
        res.status.send(user)
    })
})

module.exports = router;
