const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// model and helpers
const users = require('./users-model.js');
const {validateUser} = require('./auth-helpers');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  // console.log(user)
  const validateResult = validateUser(user);

  if(validateResult.isSuccessful === true){
    const hashedPass = bcrypt.hashSync(user.password, 10);
    user.password = hashedPass;
  
    users.add(user)
    .then(newUser => {
      console.log(newUser)
      res.status(201).json(newUser);
    }) 
    .catch(err => {
      res.status(500).json({error: err, message: `failed to add new user`});
    })
  } else {
    res.status(400).json({
      message: `Invalid registration details, refer to error`,
      error: validateResult.errors
    });
  }
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  users.findBy({username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) { //compare server hashed pass against new hash of plaintext pw
      const token = getJwtToken(user.username);

      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(401).json({message: `Invalid credentials`})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: `there was an error logging in`,
      error: error
    });
  });

});



//get jwt token
function getJwtToken(username){
  //define payload
  const payload = {
    username
  };

  //secret
  const secret = process.env.JWT_SECRET || "super secret secret phrase";

  //options
  const options = {
    expiresIn: '1d'
  }
  
  //sign token and ship
  return jwt.sign(payload, secret, options)
}


module.exports = router;
