const express = require('express');
const bodyParser = require('body-parser');
const User = require('../user/User');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const bcrypt = require('bcryptjs');
const config = require('../config');
const router = express.Router();

router.use(cors())
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


const VerifyToken = require('./VerifyToken');


router.post('/login', function(req, res) {
    //console.log(req.body)
    User.findOne({ user_name: req.body.user_name }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      // check if the password is valid
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
      // if user is found and password is valid
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      // return the information including token as JSON
      res.status(200).send({ auth: true, token: token });
    });
  
  });
  
  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });
  
  router.post('/register', function(req, res) {
    const salt = bcrypt.genSaltSync(8)
    var hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
    User.create({
      first_name : req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      email : req.body.email,
      password : hashedPassword
    }, 
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user`.");
      // if user is registered without errors
      // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      res.status(200).send({ auth: true, token: token });
    });
  
  });

  router.get('/me', function(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      User.findById(decoded.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
    });
  });

  
  module.exports = router;