const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// model and helpers
const users = require('./users-model.js');
const {validateUser} = require('./auth-helpers');

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

//get jwt token

function getJwtToken(username){
  //define payload
  const payload = {
    username
  };

  //secret
  const secret = process.env.JWT_SECRET || "is it secret, is it secure?";

  //options
  const options = {
    expiresIn: '1d'
  }
  
  //sign token and ship
  return jwt.sign(payload, secret, options)
}


module.exports = router;
